import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { PdfMakeWrapper, Txt, Columns} from 'pdfmake-wrapper';
import { PagoServices} from '../../../@data/services/pago.service';
import {environment} from "../../../../constantes";

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  email: string;
  tokenId: any;
  nropedido: any;
  monto: any;
  tarjeta: any;
  tipotarjeta: string;
  montoVisa: string;
  pedidoVisa: string;
  moneda: string;
  mail: string;
  isLoading = false;
  jsonAutorizacion: string;
  transactionToken: string;
  transactionid: string;
  tokenVisa: string;
  tokenApi: string;
  tokenSessionVisa: string;
  importe: number;
  nroPedido: number;
  codigoautorizacion: number;
  descripcion: string;
  fecha: string;
  nrosuministro: string;
  periodos: string;
  btn_ok: boolean = false;
  btn_error: boolean = false;
  merchantid: string;
  id_empresa: string;
  nombre_empresa : string;
  direccion_empresa: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagoServices: PagoServices,
  ) { }

//   esCereza(fruta) {
//     return fruta.nombre === 'cerezas';
// }

  ngOnInit(): void {

    this.isLoading = true;
    this.tokenId = this.route.snapshot.paramMap.get('transactionId');
    this.nropedido = this.route.snapshot.paramMap.get('purchaseNumber');
    this.monto = this.route.snapshot.paramMap.get('amount');
    this.email = this.route.snapshot.paramMap.get('email');
    this.nrosuministro = this.route.snapshot.paramMap.get('suministro');
    this.periodos = this.route.snapshot.paramMap.get('periodos');
    this.id_empresa = this.route.snapshot.paramMap.get('idempresa');



    environment.DATOS_EMPRESA.find(element => {
      if (element.id == this.id_empresa.toString()) {
        this.nombre_empresa = element.nombre;
        this.direccion_empresa = element.direccion;
      }
    });

    this.pagoServices.generarToken(Number(this.nrosuministro)).subscribe(
      res => {
        this.tokenApi = res;
        this.pagoServices.listarConfig(this.tokenApi).subscribe(
          res => {
            var pass = res.parametrosAppConfig[5].value;
            var user = res.parametrosAppConfig[11].value;
            res.parametrosAppConfig.forEach(element => {
              if(Number(element.idEmpresa)+1 == Number(this.id_empresa)){
                this.merchantid = element.value;
              }
            });
            this.pagoServices.generarTokenVisa(user,pass).subscribe(
              res => {
                this.tokenVisa = res;
                this.pagoServices.generarSesionVisa(res, this.monto,this.merchantid).subscribe(
                  res => {
                    this.tokenSessionVisa = res.sessionKey;
                    this.pagoServices.autorizacionVisa(this.tokenVisa, this.tokenId, this.nropedido, this.monto,this.merchantid).subscribe(
                      res => {
                        this.jsonAutorizacion = JSON.stringify(res);
                        this.tarjeta = res.dataMap.CARD;
                        this.tipotarjeta = res.dataMap.BRAND;
                        this.montoVisa = res.dataMap.AMOUNT;
                        this.pedidoVisa = res.order.purchaseNumber;
                        this.moneda = res.order.currency;
                        this.transactionToken = res.order.tokenId;
                        this.transactionid = res.order.transactionId;
                        this.codigoautorizacion = res.order.authorizationCode;
                        this.descripcion = res.dataMap.ACTION_DESCRIPTION;
                        this.importe = Number(this.monto);
                        this.nroPedido =  Number(this.nropedido);
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
                        this.fecha = hoy.getFullYear() + "/" + mes + "/" + hoy.getDate() + ' ' + hoy.getHours() + ':' + minuto;

                        this.pagoServices.generarToken(this.nropedido).subscribe(
                          res => {
                            this.tokenApi = res;
                            this.pagoServices.verificarPago(this.tokenApi, this.tokenVisa,this.nroPedido).subscribe(
                              res => {
                                this.pagoServices.generarIntentoPago(this.tokenApi, this.tokenSessionVisa, this.transactionToken, this.email.toString(),
                                this.jsonAutorizacion, this.nroPedido, this.importe, this.transactionid, this.tarjeta).subscribe(
                                res => {
                                  this.pagoServices.realizarPago(this.tokenApi, this.tokenSessionVisa, this.transactionToken, this.email.toString(),
                                  this.jsonAutorizacion, this.nroPedido, this.importe, this.transactionid, this.tarjeta).subscribe(
                                    res => {
                                      this.isLoading = false;
                                      this.btn_ok = true;
                                      var resumen = document.getElementById('pago_resumen');
                                      var titulo = document.getElementById('pago_titulo');
                                      var div_btn_salir = document.getElementById('div_salir');
                                      var procesando = document.getElementById('procesando_pago');
                                      resumen.setAttribute('class','container display-inline');
                                      titulo.setAttribute('class','color-primary-custom display-inline');
                                      div_btn_salir.setAttribute('class','display-none');
                                      procesando.setAttribute('class','display-none');
                                    },
                                    error => {
                                      this.isLoading = false;
                                      this.btn_error = true;
                                      var resumen = document.getElementById('pago_error_distriluz');
                                      var titulo = document.getElementById('pago_titulo_error');
                                      var div_pagado = document.getElementById('div_pagado');
                                      div_pagado.setAttribute('class','display-none');
                                      resumen.setAttribute('class','container display-inline');
                                      titulo.setAttribute('class','color-primary-custom display-inline mt-2');
                                    }
                                  );
                                },
                                error => {
                                  this.isLoading = false;
                                  this.btn_error = true;
                                  var resumen = document.getElementById('pago_error_distriluz');
                                  var titulo = document.getElementById('pago_titulo_error');
                                  var div_pagado = document.getElementById('div_pagado');
                                  div_pagado.setAttribute('class','display-none');
                                  resumen.setAttribute('class','container display-inline');
                                  titulo.setAttribute('class',' color-primary-custom display-inline mt-2');
                                });
                              },
                              error => {
                                this.isLoading = false;
                                this.btn_error = true;
                                var resumen = document.getElementById('pago_error_distriluz');
                                var titulo = document.getElementById('pago_titulo_error');
                                var div_pagado = document.getElementById('div_pagado');
                                div_pagado.setAttribute('class','display-none');
                                resumen.setAttribute('class','container display-inline');
                                titulo.setAttribute('class','color-primary-custom display-inline mt-2');
                              }
                            )

                          },
                          error => {
                            this.isLoading = false;
                            this.btn_error = true;
                            var resumen = document.getElementById('pago_error_distriluz');
                            var titulo = document.getElementById('pago_titulo_error');
                            var div_pagado = document.getElementById('div_pagado');
                            div_pagado.setAttribute('class','display-none');
                            resumen.setAttribute('class','container display-inline');
                            titulo.setAttribute('class','color-primary-custom display-inline mt-2');
                          }
                        );
                      },
                      error => {
                        this.isLoading = false;
                        this.btn_error = true;
                        var resumen = document.getElementById('pago_error_autorizacion');
                        var titulo = document.getElementById('pago_titulo_error');
                        var div_pagado = document.getElementById('div_pagado');
                        div_pagado.setAttribute('class','display-none');
                        resumen.setAttribute('class','container display-inline');
                        titulo.setAttribute('class','color-primary-custom display-inline mt-2');
                      }
                    )
                  },
                  error => {
                    this.isLoading = false;
                    this.btn_error = true;
                    var resumen = document.getElementById('pago_error_autorizacion');
                    var titulo = document.getElementById('pago_titulo_error');
                    var div_pagado = document.getElementById('div_pagado');
                    div_pagado.setAttribute('class','display-none');
                    resumen.setAttribute('class','container display-inline');
                    titulo.setAttribute('class','color-primary-custom display-inline mt-2');
                  }
                )
              },
              error => {
                this.isLoading = false;
                this.btn_error = true;
                var resumen = document.getElementById('pago_error_autorizacion');
                var titulo = document.getElementById('pago_titulo_error');
                var div_pagado = document.getElementById('div_pagado');
                div_pagado.setAttribute('class','display-none');
                resumen.setAttribute('class','container display-inline');
                titulo.setAttribute('class','color-primary-custom display-inline mt-2');
              }
            );
          },
          error => {
            this.isLoading = false;
            this.btn_error = true;
            var resumen = document.getElementById('pago_error_autorizacion');
            var titulo = document.getElementById('pago_titulo_error');
            var div_pagado = document.getElementById('div_pagado');
            div_pagado.setAttribute('class','display-none');
            resumen.setAttribute('class','container display-inline');
            titulo.setAttribute('class','color-primary-custom display-inline mt-2');
          }
        )
      },
      error => {
        this.isLoading = false;
        this.btn_error = true;
        var resumen = document.getElementById('pago_error_autorizacion');
        var titulo = document.getElementById('pago_titulo_error');
        var div_pagado = document.getElementById('div_pagado');
        div_pagado.setAttribute('class','display-none');
        resumen.setAttribute('class','container display-inline');
        titulo.setAttribute('class','color-primary-custom display-inline mt-2');
      }
    );


  }

  async generatePdf(){
    const pdf = new PdfMakeWrapper();
    var size = 17;
    var space = 8;
    var margin = 6;
    // pdf.add(
    //   await new Img('./src/assets/image/logo.png',true).build(),
    // );
    pdf.add(
      new Txt('PAGO REALIZADO').alignment('center').fontSize(22).font('Roboto').bold().margin(8).end,
    );
    pdf.add(
      new Txt('A continuación se muestra el detalle del pago realizado:').alignment('left').fontSize(15).font('Roboto').margin(4).end,
    );
    pdf.add(
      new Columns([]).margin(6).end,
    );
    pdf.add(
      new Txt('').alignment('left').end
    );
    pdf.add(
      new Columns([ new Txt('Número de pedido:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.pedidoVisa).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end,]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Número de tarjeta:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.tarjeta).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end, ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Fecha y hora de autorización:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.fecha).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Importe autorizado:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.montoVisa).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Moneda autorizada:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.moneda).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end, ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Descripción de la transacción:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt('Pago del suministro '+ this.nrosuministro+',Periodos: '+ this.periodos).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end, ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Código de la autorización:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.codigoautorizacion.toString()).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end, ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Descripción de la autorización:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.descripcion).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end, ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Nombre del comercio:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.nombre_empresa).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end, ]).columnGap(space).margin(margin).end
    );
    pdf.add(
      new Columns([ new Txt('Dirección del comercio:').alignment('right').fontSize(size).font('Roboto').bold().end,
      new Txt(this.direccion_empresa).alignment('left').color('#003A70').fontSize(size).font('Roboto').bold().end, ]).columnGap(space).margin(margin).end
    );
    pdf.create().download('Recibo de suministro '+this.nrosuministro+' N° pedido '+this.nroPedido.toString());
  }
}
