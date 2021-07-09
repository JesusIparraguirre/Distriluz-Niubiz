// import {Inject, Injectable, NgZone} from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {BehaviorSubject, Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
// import {User} from '../models/User';
// import {Const} from "./const";
// import {WINDOW} from "./windows.providers";
// import {AuthenticationRepository} from "../../@domain/repository/authentication.repository";

// @Injectable({ providedIn: 'root' })
// export class AuthenticationService implements AuthenticationRepository {
//   // forgotPassSendMail(valor: string): Observable<any> {
//   //   throw new Error("Method not implemented.");
//   // }
//   // verificaCodigo(iduser: string, cod: string): Observable<boolean> {
//   //   throw new Error("Method not implemented.");
//   // }
//   // reestablecePAss(iduser: string, newPass: string): Observable<boolean> {
//   //   throw new Error("Method not implemented.");
//   // }
//   // reestablecePassCasilla(currentPass: string, newPass: string): Observable<any> {
//   //   throw new Error("Method not implemented.");
//   // }
//   private currentUserSubject: BehaviorSubject<User>;
//   public currentUser: Observable<User>;

//   constructor(
//     private http: HttpClient,
//     private zone: NgZone,
//     @Inject(WINDOW) private window: Window,
//   ) {
//     super();
//     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
//     this.currentUser = this.currentUserSubject.asObservable();
//     this.obtainBrowserDetail();
//     this.obtainHostName();
//   }

//   public get getCurrentUserValue(): User {
//     return this.currentUserSubject.value;
//   }

//   login(login: string, clave: string): Observable<any> {
//     let browserdetailt: {} = this.obtainBrowserDetail();
//     let header = new HttpHeaders({
//       'X-AppKey': Const.XAPPKEY,
//       'X-AppCode': Const.XAPPCODE,
//       'User-Agent-Ip': sessionStorage.getItem(Const.LOCAL_IP),
//       'User-Agent-Hostname': sessionStorage.getItem(Const.HOST_NAME),
//       'User-Agent-Browser': browserdetailt['name'],
//       'User-Agent-BrowserVersion': browserdetailt['version'],
//     });

//     let urlApi = Const.API_LOGIN;
//     // Logica anterior
//     // if (this.esSoloNumeros(login)) {
//     //   urlApi = Const.API_LOGIN_CASILLA;
//     // }

//     return this.http.post<any>(urlApi, { login, clave },
//       {
//         headers: header,
//         observe: 'response',
//       })
//       .pipe(map(response => {
//         console.log('Login', response);
//         let usuario = response.body.usuario;
//         console.log('Login in', usuario);
//         usuario.token = response.headers.get('Authorization');
//         // console.log('usuario: ', usuario);

//         // Logica anterior
//         // if (typeof usuario.idPersona !== "undefined" && usuario.idPersona !== null) {
//         //   usuario.esExterno = false;
//         // } else if (typeof usuario.idCliente !== "undefined" && usuario.idCliente !== null) {
//         //   usuario.esExterno = true;
//         // }

//         // Logica nueva
//         usuario.esExterno = usuario.tipo === 2;

//         localStorage.setItem('currentUser', JSON.stringify(usuario));
//         localStorage.setItem('token', usuario.token);
//         this.currentUserSubject.next(usuario);
//         console.log('logeado');
//         return usuario;
//       }));
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//   }

//   // forgotPassSendMail(valor: string): Observable<any> {
//   //   let header = new HttpHeaders({
//   //     'X-AppKey': Const.XAPPKEY,
//   //     'X-AppCode': Const.XAPPCODE,
//   //     'X-AppRestorePassKey': Const.XAPPRESTOREPWDKEY,
//   //   });
//   //   return this.http.put<any>(Const.API_FOGOT_PASS_SEND_MAIL, {llave: "Email", valor: valor}, {headers : header});
//   // }

//   // verificaCodigo(iduser: string, cod: string) {
//   //   let header = new HttpHeaders({
//   //     'X-AppKey': Const.XAPPKEY,
//   //     'X-AppCode': Const.XAPPCODE,
//   //   });
//   //   return this.http.put<any>(Const.getApiVerifica(iduser, cod), {}, {headers : header, observe: 'response'})
//   //     .pipe(map( response => {
//   //       return response.status === 204;
//   //       }));
//   // }

//   // reestablecePAss(iduser: string, newPass: string) {
//   //   let header = new HttpHeaders({
//   //     'X-AppKey': Const.XAPPKEY,
//   //     'X-AppCode': Const.XAPPCODE,
//   //   });
//   //   return this.http.put<any>(Const.getReestablece(iduser), { llave: "Clave", valor: newPass }, {headers : header, observe: 'response'})
//   //     .pipe(map( response => {
//   //       return response.status === 204;
//   //       }));
//   // }

//   // reestablecePassCasilla(currentPass: string, newPass: string): Observable<any> {
//   //   const jsonBody = [
//   //     { 'llave': 'Clave', 'valor': currentPass },
//   //     { 'llave': 'NuevaClave', 'valor': newPass },
//   //   ];

//   //   return this.http.put<any>(Const.API_REESTABLECE_CLAVE_CASILLA, jsonBody, { observe: 'response' })
//   //     .pipe(map( response => {
//   //       return response.status === 204;
//   //       }));
//   // }

//   private obtainBrowserDetail(): {} {
//     let ua = window.navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
//     if (/trident/i.test(M[1])) {
//       tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
//       return {name: 'IE', version: (tem[1] || '')};
//     }
//     if (M[1] === 'Chrome') {
//       tem = ua.match(/\bOPR\/(\d+)/);
//       if (tem != null)   {return {name: 'Opera', version: tem[1]}; }
//     }
//     M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
//     if ((tem = ua.match(/version\/(\d+)/i)) != null) {M.splice(1, 1, tem[1]); }
//     return {name: M[0], version: M[1]};
//   }

//   private obtainHostName() {
//     sessionStorage.setItem(Const.HOST_NAME, 'Mi PC');
//   }

//   private esSoloNumeros(cadenaTest: string): boolean {
//     const regExp = new RegExp(/^\d+$/g);
//     return regExp.test(cadenaTest);
//   }

// }

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Const} from "./const";
import {map} from "rxjs/operators";
import {AuthenticationRepository} from "../../@domain/repository/authentication.repository";
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements AuthenticationRepository {

  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.obtainBrowserDetail();
    this.obtainHostName();
   }

  login(user: string, pass: string): Observable<any> {
    let browserdetailt: {} = this.obtainBrowserDetail();
    let header = new HttpHeaders({
      'X-AppKey': 'RGlzdHJpbHV6X05JVUJJWl9BcGxpY2FjaW9u',
      'X-AppCode': 'F4640DCF-81C7-441E-9AF5-42AA551ECA47',
      'User-Agent-Ip': 'LOCAL_IP',
      'User-Agent-Hostname': 'HOST_NAME',
      'User-Agent-Browser': 'BROWSER_NAME',
      'User-Agent-BrowserVersion': 'BROWSER_VERSION',
    });
    return this.http.post<any>(Const.API_LOGIN, { "login": user, "clave" :pass },
      {
        headers: header,
        observe: 'response',
      })
      .pipe(map(response => {
        let usuario = response.body.usuario;
        usuario.token = response.headers.get('Authorization');
        // localStorage.setItem('currentUser', JSON.stringify(usuario));
        localStorage.setItem('token', usuario.token);
        this.currentUserSubject.next(usuario);
        return usuario;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    console.log('qwe');
    // this.currentUserSubject.next(null);
    // elimina autorizacion
    localStorage.removeItem('token');
  }

  public get getCurrentUserValue(): User {
    return this.currentUserSubject.value;
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

  private obtainHostName() {
    sessionStorage.setItem(Const.HOST_NAME, 'Mi PC');
  }
}

