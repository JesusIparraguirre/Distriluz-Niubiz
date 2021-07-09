import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Const} from "./const";
import {map} from "rxjs/operators";
import {PagoRepository} from "../../@domain/repository/pago.repository";
import {Observable} from "rxjs";
import {environment} from "../../../constantes";


@Injectable({ providedIn: 'root' })
export class PagoServices implements PagoRepository {
  constructor(private http: HttpClient) { }

  validarNroServicio(NroServicio: number): Observable<any>{
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
    });
    return this.http.get<any>(Const.API_CONSULTAR_SUMINISTRO.replace("{nroservicio}", NroServicio.toString()),{headers: header})
    .pipe(map(response => {
      return response;
    }));

  }

  validarDni(nrodocumento: string): Observable<any>{
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
    });
    let jsonBody = {  "TipoDocumento": 1, "Nrodocumento": nrodocumento};
    let param = new HttpParams().
      set("Nrodocumento", nrodocumento.toString());
    return this.http.get<any>(Const.API_CONSULTAR_DNI, {
      headers: header,
      params: param
    })
      .pipe(map(response => {
        localStorage.setItem('dni', response[0].nroDocumentoPropietario);
        return response;
      }));

  }

  consultar(valor: string, tipo: number): Observable<any>{
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
    });
    switch(tipo){
      case 1:
          return this.http.get<any>(Const.API_CONSULTAR_SUMINISTRO.replace("{nroservicio}", valor),{headers: header})
          .pipe(map(response => {
            localStorage.setItem('dni', response.nroDocumentoPropietario);
            return response;
          }));
        break;
      case 2:
            let param = new HttpParams().
              set("Nrodocumento", valor);
              return this.http.get<any>(Const.API_CONSULTAR_DNI, {
              headers: header,
              params: param
            })
              .pipe(map(response => {
                localStorage.setItem('dni', response[0].nroDocumentoPropietario);
                return response;
              }));
        break;
        }
    // }
  }

  detalleDeuda(nroservicio: number): Observable<any>{
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
    });
    return this.http.get<any>(Const.API_CONSULTAR_DETALLE_DEUDA.replace("{nroservicio}", nroservicio.toString()),{headers: header})
    .pipe(map(response => {
      return response;
    }));
  }
  // generar token api PASO 00
  generarToken(nroservicio: number): Observable<any> {
    let browserdetailt: {} = this.obtainBrowserDetail();
    let header = new HttpHeaders({
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
      'User-Agent-Ip': 'LOCAL_IP',
      'User-Agent-Hostname': 'HOST_NAME',
      'User-Agent-Browser': 'BROWSER_NAME',
      'User-Agent-BrowserVersion': 'BROWSER_VERSION',
    });
    return this.http.get<any>(Const.API_GENERAR_TOKEN.replace("{nroservicio}", nroservicio.toString()), {headers: header, observe: 'response'})
      .pipe(map(response => {
        var headers: any;
        headers = response.headers.get('Authorization');
        // localStorage.setItem('tokenVisa', headers);
        // console.log(response.headers.get('Authorization'));
        return headers;
      }));
  }

  // generar pedido api PASO 01
    gerenarPedido(nropedido: number, importe: number, dni: string, authorization: string,cuotas : number): Observable<any> {
    let header = new HttpHeaders({
      'Authorization': authorization.toString(),
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    return this.http.post<any>(Const.API_GENERAR_NROPEDIDO,
    {
      "nroServicio": nropedido,
      "importe": importe,
      "idEmpresa": 3,
      "cuotas": cuotas,
      "sessionTokenVisa": authorization.toString(),
      "nrodocumentopropietario": dni.toString()
    },
    {
      headers: header,
      observe: 'response',
    })
    .pipe(map(response => {
      return response;
    }));
  }

    // Verifica pago Visa
    verificarPago(token: string, tokenVisa: string, nropedido: number) {
      let header = new HttpHeaders({
        'Authorization': token,
      });
      return this.http.post<any>(Const.API_VERIFICAR_PAGO,{
        "idEmpresa": 3,
        "idType": 0,
        "tokenVisa": tokenVisa,
        "nroPedido": nropedido
      },
      {
        headers: header,
      })
      .pipe(map(response => {
        return response;
      }));
    }

   // Genera intento pago PASO 02
   generarIntentoPago(token: string, sessionToken: string, transactionToken: string, email: string, jsonPagoVisa: string,
    nropedido: number, importe: number, transactionId: string, nrotarjeta: string): Observable<any> {
    let header = new HttpHeaders({
      'Authorization': token,
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    return this.http.post<any>(Const.API_GENERAR_INTENTO_PAGO,
      {
        "sessionTokenVisa": sessionToken,
        "transactionTokenVisa": transactionToken,
        "customerEmail": email,
        "jsonPagoVisa": jsonPagoVisa,
        "idEstadoPaso": 1,
        "mensajePaso": "Se Autorizo correctamente",
        "nroPedido": nropedido,
        "importe": importe,
        "transaction_id": transactionId,
        "action_description": "Correcto",
        "nroTarjeta": nrotarjeta
      },
      {
        headers: header,
      })
      .pipe(map(response => {
        return response;
      }));
  }

  // realizar pago
  realizarPago(token: string, sessionToken: string, transactionToken: string, email: string, jsonPagoVisa: string,
    nropedido: number, importe: number, transactionId: string, nrotarjeta: string) {
    let header = new HttpHeaders({
      'Authorization': token,
      'X-AppKey': Const.XAPPKEY,
      'X-AppCode': Const.XAPPCODE,
    });
    return this.http.post<any>(Const.API_REALIZAR_PAGO,
      {
        "sessionTokenVisa": sessionToken,
        "transactionTokenVisa": transactionToken,
        "customerEmail": email,
        "jsonPagoVisa": jsonPagoVisa,
        "idEstadoPaso": 1,
        "mensajePaso": 'Se Registro correctamente la transaccion en Distriluz',
        "nroPedido": nropedido,
        "importe": importe,
        "transaction_id": transactionId,
        "action_description": 'Correcto',
        "nroTarjeta": nrotarjeta
      },
      {
        headers: header,
      })
      .pipe(map(response => {
        return response;
      }));
  }

  // generar Token Visa
  generarTokenVisa(user: string, pass: string): Observable<any> {
    const url = environment.URL_TOKEN_VISA;
    const usuario = user;
    const password = pass;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(usuario + ':' + password),
    });

    return this.http.get(url, { headers: header, responseType: 'text' });
  }

  // generar Sesion Visa
  generarSesionVisa(token: string, monto: number, merchantid: string): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    });
    const url = environment.URL_SESION_VISA;
    const channel = 'web';
    return this.http.post(url + merchantid, { 'amount': monto, "antifraud": null, "channel": channel}, { headers: header });
  }

  // autorizacion Visa
  autorizacionVisa(token, transactionToken, purchase, amount, merchantid: string): Observable<any> {
    const url = environment.URL_AUTORIZACION_VISA;
    const merchant = merchantid;
    const channel = 'web';
    const currency = 'PEN';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    });
    const order = { 'amount' : amount, 'tokenId': transactionToken, 'purchaseNumber': purchase, 'currency': currency };
    return this.http.post(url + merchant, { 'antifraud': null, 'captureType': 'manual', "countable": true, "channel": channel, 'order': order}, { headers: headers });
  }

  // listar configuracion de visa
  listarConfig(token: string): Observable<any> {
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
      'Authorization': token,
    });

    return this.http.get<any>(Const.API_LISTAR_CONFIG, {headers: header})
    .pipe(map(response => {
      return response;
    }))
    ;
  }

  // cancelar pago
  cancelarPago(token: string, nropedido : number) {
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
      'Authorization': token.toString(),
    });

    return this.http.post<any>(Const.API_CANCELAR_PAGO.replace("{nropedido}",nropedido.toString()), {}, {
      headers : header
    })
    .pipe(map( response => {
      return response;
    }))
  }

  // listar pagos no procesados
  listarNoProcesados(token: string): Observable<any> {
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
      'Authorization': token,
    });
    return this.http.get<any>(Const.API_LISTAR_NOPROCESADOS, {headers: header})
    .pipe(map(response => {
      return response;
    }));
  }

  // realizar pago de no procesados
  pagoNoProcesados(token: string, nropedido: number) {
    let header = new HttpHeaders({
      'Authorization': token,
    });
    return this.http.post<any>(Const.API_REALIZAR_PAGO_NOPROCESADO.replace("{nropedido}", nropedido.toString()),
      {},
      {
        headers: header
      })
      .pipe(map(response => {
        return response;
      }));
  }

  private obtainBrowserDetail(): {} {
    let ua = window.navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name: 'IE', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null)   {return {name: 'Opera', version: tem[1]}; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {M.splice(1, 1, tem[1]); }
    return {name: M[0], version: M[1]};
  }
}

