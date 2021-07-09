//import {User} from "../../@data/models/User";
import {Observable} from "rxjs";


export abstract class AuthenticationRepository {

  //abstract get getCurrentUserValue(): User;
  abstract login(user: string, pass: string): Observable<any>;
  abstract logout(): void;
  // abstract forgotPassSendMail(valor: string): Observable<any>;
  // abstract verificaCodigo(iduser: string, cod: string): Observable<boolean>;
  // abstract reestablecePAss(iduser: string, newPass: string): Observable<boolean>;
  // abstract reestablecePassCasilla(currentPass: string, newPass: string): Observable<any>;
}
