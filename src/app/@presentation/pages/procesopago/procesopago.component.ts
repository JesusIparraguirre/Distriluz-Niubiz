import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { PagoServices} from '../../../@data/services/pago.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditCardValidators } from 'angular-cc-library';

import { Suministro } from '../../../@data/models/Suministro';
import { DetalleDeuda } from '../../../@data/models/DetalleDeuda';
import {MatDialog} from '@angular/material/dialog';
import {TerminosComponent} from '../../common-components/terminos/terminos.component'
import {environment} from "../../../../constantes";

@Component({
  selector: 'app-procesopago',
  templateUrl: './procesopago.component.html',
  styleUrls: ['./procesopago.component.css']
})
export class ProcesopagoComponent implements OnInit,OnChanges {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  isLinear = true;
  mobile : boolean = false;

  nrosuministro: number;
  nombre: string;
  direccion: string;

  checked = false;
  allComplete: boolean = false;
  suministro: Suministro = new Suministro();
  deudas: DetalleDeuda[] = [];

  cargando: boolean = true;
  error: boolean = false;
  totalpago: string = "0";

  submitted: boolean = false;
  pagoForm: FormGroup;
  cuota: number = 0;
  disabled: boolean = true;
  var: number[] = [];
  deuda: any;
  deudatotal: number = 0;
  btn: boolean = true;
  isLoading: boolean = false;
  nropedido: string;
  formpago: boolean = false;
  periodos: string[] = [];
  nroperiodos: string;
  pagovisa: boolean = false;
  loadvisa: boolean;
  terminos: boolean = false;
  mes_check: boolean = false;
  fecha: string;
  siguiente_check: boolean = false;
  ayuda: number = 0;
  token: string;
  id_empresa: number;
  merchantid: string;
  btnVisible: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pagoServices: PagoServices,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  goBack() {
    history.go(-1);
  }

  ngOnChanges() {
    if(this.mes_check == true && this.formpago == true){
      this.siguiente_check = true;
    }
  }

  ngOnInit(): void {

    this.pagoForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      creditCard: ['', [CreditCardValidators.validateCCNumber, Validators.required]],
      expirationDate: ['', [CreditCardValidators.validateExpDate]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });

    this.route.params.subscribe(params => {
      this.nrosuministro = +params['nrosuministro'];
    });

    this.pagoServices.validarNroServicio(this.nrosuministro).subscribe(result => {
      this.suministro = result;
    },
    error => {
      // this.error = true;
    });

    this.pagoServices.detalleDeuda(this.nrosuministro).subscribe(result => {
      this.cargando = false;
      this.deudas = result;
      this.deudas = this.deudas.filter(item => item.saldo = parseFloat(item.saldo).toFixed(2));
      this.deudas.forEach((item) =>
        this.deudatotal = this.deudatotal + parseFloat(item.saldo),
      );
      this.deudas.forEach((item) =>
        this.id_empresa = item.idEmpresa
      );
      this.deudas.forEach((item,i) =>
        item.mes = i,
      );
      this.deudas.forEach((item,i) =>
        this.var.push(i),
      );
      this.deudas.forEach((item,i) =>
      {
        if(this.var[i]==0)
         item.disabled = true
        else
          item.disabled = false
      }
      );
    },
    error => {
      this.error = true;
      this.cargando = false;
    });

    var ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.mobile = true;
    }
  }

  eventCheck(event, saldo){
    this.totalpago = event.checked ? (parseFloat(this.totalpago) + parseFloat(saldo)).toFixed(2) :  (parseFloat(this.totalpago) - parseFloat(saldo)).toFixed(2);
    if (event.checked) {
      this.cuota = this.cuota + 1;
       this.deudas.forEach((item,i) =>
       {
        if(item.mes == this.cuota-1){
          this.periodos[i] = item.idPeriodo.toString().substr(0,4)+'-'+item.idPeriodo.toString().substr(4,6);
        }
      });
      }

    if (!event.checked) {
      this.cuota = this.cuota - 1;
      this.deudas.forEach((item,i,) =>
       {
        if(item.mes == this.cuota-2){
          this.periodos.splice(this.cuota,1);
        }
        if(item.mes == this.cuota-1){
          this.periodos.splice(this.cuota,1);
        }
        if(item.mes == this.cuota){
          this.periodos.splice(this.cuota,1);
        }
       }
      );
    }
  }

  eventDisabled(event) {
    if (event.checked) {
      this.ayuda = this.ayuda+1;
      this.deudas.forEach((item,i) => {
        if(item.mes == this.ayuda){
          item.disabled = true;
        }
        if(item.mes == this.ayuda-2){
          item.disabled = false;
        }
      });
    }
    if (!event.checked) {
      this.deudas.forEach((item,i) => {
        if(item.mes == this.ayuda){
          item.disabled = false;
        }
        if(item.mes == this.ayuda-2){
          item.disabled = true;
        }
      }
      );
      this.ayuda = this.ayuda - 1;
    }
  }

  eventTerminos(event) {
    if (event.checked) {
      this.formpago = true;
    }
    if (!event.checked) {
      this.formpago = false;
    }
  }

  openTerminos() {
    this.dialog.open(TerminosComponent);
  }

  pago(stepper: MatStepper, nroservicio: number,totalpago: string) {
    if(parseFloat(this.totalpago) === 0){
      this._snackBar.open("Debe seleccionar al menos un recibo a cancelar", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
      return;
    }
    else {
      this.nroperiodos = this.periodos.toString();
      this.isLoading = true;
      var importe = Number(totalpago);
      var dni = localStorage.getItem('dni');
      this.pagoServices.generarToken(nroservicio).subscribe(
        result => {
        this.token = result;
        this.pagoServices.gerenarPedido(nroservicio, importe, dni, result,this.cuota).subscribe(
          result => {
            var hoy = new Date();
            var mes_posicion = Number(hoy.getMonth());
            var meses = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            var mes = meses[mes_posicion];
            var minuto_x = hoy.getMinutes();
            var minuto;
            if(minuto_x < 10) {
              minuto = '0'+minuto_x;
            }
            else {
              minuto = minuto_x;
            }
            this.nropedido = result.body.nroPedido;
            this.fecha = hoy.getFullYear() + '/'+ mes.toString() + '/' + hoy.getDate() + ' ' + hoy.getHours() + ':' + minuto;
            this.pagoServices.listarConfig(this.token).subscribe(
              result => {
                var pass = result.parametrosAppConfig[5].value;
                var user = result.parametrosAppConfig[11].value;
                result.parametrosAppConfig.forEach(element => {
                  if( Number(element.idEmpresa)+1 == this.id_empresa){
                    this.merchantid = element.value.toString();
                  }
                });
                this.pagoServices.generarTokenVisa(user,pass).subscribe(
                    result => {
                      this.pagoServices.generarSesionVisa(result, importe, this.merchantid).subscribe(
                        res => {
                          let form = document.createElement("form");
                          form.setAttribute('method', "POST");
                          form.setAttribute('action', environment.URL_ACTION_FORMVISA+"?purchase="+this.nropedido+"&amount="+importe+"&suministro="+this.nrosuministro+"&periodos="+this.nroperiodos+"&idempresa="+this.id_empresa);
                          form.setAttribute('id', "boton_pago");
                          document.getElementById("btnPago").appendChild(form);

                          let scriptEl = document.createElement('script');
                          scriptEl.setAttribute('id','script_pago');
                          scriptEl.setAttribute('src', environment.URL_FORMULARIO_VISA);
                          scriptEl.setAttribute('data-sessiontoken', res.sessionKey);
                          scriptEl.setAttribute('data-merchantid', '602545705');
                          scriptEl.setAttribute('data-purchasenumber', this.nropedido);
                          scriptEl.setAttribute('data-merchantlogo', environment.URL_LOGO_VISA);
                          scriptEl.setAttribute('data-channel', 'web');
                          scriptEl.setAttribute('data-amount', totalpago );
                          scriptEl.setAttribute('data-buttonsize', 'MEDIUM' );
                          scriptEl.setAttribute('data-timeouturl', '5');
                          document.getElementById("boton_pago").appendChild(scriptEl);

                          this.isLoading = false;
                          this.pagovisa = true;
                          this.loadvisa = false;
                          this.btnVisible = false;
                          stepper.next();
                        },
                        error => {
                          console.log(error);
                          this.isLoading = false;
                          this._snackBar.open("ERROR AL GENERAR FORMULARIO DE PAGO", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
                          return;
                        }
                      );
                    },
                    error => {
                      console.log(error);
                      this.isLoading = false;
                      this._snackBar.open("ERROR AL GENERAR FORMULARIO DE PAGO", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
                      return;
                    }
                  );

              },
              error => {
                console.log(error);
                this.isLoading = false;
                this._snackBar.open("ERROR AL GENERAR PEDIDO, INTENTELO DE NUEVO", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
                return;
              }
            )
          },
          error => {
            console.log(error);
            this.isLoading = false;
            this._snackBar.open("ERROR AL GENERAR PEDIDO, INTENTELO DE NUEVO", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
            return;
          });
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this._snackBar.open("ERROR AL GENERAR PEDIDO, INTENTELO DE NUEVO", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
          return;
        });
    }
  }

  back(){
    history.go(-1);
  }

  btnAtras() {
    this.pagoServices.cancelarPago(this.token,Number(this.nropedido)).subscribe(
      res => {
        location.reload();
      },
      error => {
        location.reload();
      }
    )
  }

  cancelarPedido() {
    this.pagoServices.cancelarPago(this.token,Number(Number(this.nropedido))).subscribe(
      res => {
        location.replace('');
      },
      error => {
        this._snackBar.open("ERROR AL CANCELAR PEDIDO, INTENTELO DE NUEVO", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
      }
    )
  }

  static deleteCookie(name: string) {
    const date = new Date();
    date.setTime(date.getTime() - 3600);
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
  }

}
