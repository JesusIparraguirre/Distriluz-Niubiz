import {Observable} from "rxjs";

export abstract class PagoRepository {

  abstract consultar(valor: string, tipo: number): Observable<any>;
  abstract validarNroServicio(NroServicio: number): Observable<any>;
  abstract validarDni(nrodocumento: string): Observable<any>;
  abstract detalleDeuda(nroservicio: number): Observable<any>;
  abstract generarToken(nroservicio: number): Observable<any>;
  abstract gerenarPedido(nropedido: number, importe: number, dni: string, authorization: string,cuotas : number): Observable<any>;
  abstract verificarPago(token: string, tokenVisa: string, nropedido: number);
  abstract generarIntentoPago(token: string, sessionToken: string, transactionToken: string, email: string, jsonPagoVisa: string,
    nropedido: number, importe: number, transactionId: string, nrotarjeta: string): Observable<any>;
  abstract realizarPago(token: string, sessionToken: string, transactionToken: string, email: string, jsonPagoVisa: string,
    nropedido: number, importe: number, transactionId: string, nrotarjeta: string);
  abstract generarTokenVisa(user: string, pass: string): Observable<any>;
  abstract generarSesionVisa(token: string, monto: number, merchantid: string): Observable<any>;
  abstract autorizacionVisa(token, transactionToken, purchase, amount, merchantid: string): Observable<any>;
  abstract listarNoProcesados(token: string): Observable<any>;
  abstract pagoNoProcesados(token: string, nropedido: number);

}
