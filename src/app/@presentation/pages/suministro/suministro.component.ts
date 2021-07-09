import { Component, OnInit, ɵConsole } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoServices} from '../../../@data/services/pago.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-suministro',
  templateUrl: './suministro.component.html',
  styleUrls: ['./suministro.component.css']
})
export class SuministroComponent implements OnInit {

  contactForm: FormGroup;
  isLoading = false;
  mobile: boolean = false;
  tipoCampo: number = 0;
  suministro: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private pagoServices: PagoServices, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      nrosuministro: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(6), Validators.maxLength(9), ]],
    });
    var ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.mobile = true;
    }

    localStorage.removeItem('dni');
    sessionStorage.clear();
  }

  get f() { return this.contactForm.controls; }

  // accion formulario
  onSubmit() {
    this.isLoading = true;
    var valor =this.f.nrosuministro.value;

    this.pagoServices.consultar(valor, 1).subscribe(result => {
      this.isLoading = false;
      this.router.navigate(['pages/procesopago', result.idNroServicio ]);
    },
    error => {
      this.isLoading = false;
      this._snackBar.open(error.error.error.mensaje, "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
    },
    );
    this.contactForm.clearValidators();
  }

  isSuministroEmpty() {
    return this.f.nrosuministro.value.toString().length === 0;
  }

  getErrorSuministro() {
    return !this.isSuministroEmpty() && this.f.nrosuministro.errors !== null;
  }

  // mensajes de error input
  getNrosuministroErrorMessage() {
    if (this.f.nrosuministro.hasError('required')) {
      return 'Debe ingresar un número de suministro';
    }
    if (this.getErrorSuministro()){
      return 'Debe ingresar un suministro valido';
    }
  }
}
