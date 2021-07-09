import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoServices} from '../../../@data/services/pago.service';
import { AuthenticationService } from '../../../@data/services/authentication.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  contactForm: FormGroup;
  isLoading = false;
  mobile : boolean = false;
  tipoCampo : number = 0;

  constructor(private formBuilder: FormBuilder, private pagoServices: PagoServices,private authenticationService: AuthenticationService,private router: Router,private _snackBar: MatSnackBar
) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
    });

    var ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.mobile = true;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('dni');
    sessionStorage.clear();
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {

    if (this.contactForm.invalid)
      return;

    this.isLoading = true;
    //var valor = this.tipoCampo == 1 ? this.f.nrosuministro.value : this.f.dni.value;
    this.authenticationService.login(this.f.user.value, this.f.pass.value).subscribe(result => {
      // console.log(result);
      this.isLoading = false;
      this.router.navigate(['/pages/listado']);
    },
    error =>{
      this.isLoading = false;
      // if(error.status=500 )
      //   this._snackBar.open("Error de conexión", "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
      // else if(error.status=200)
        this._snackBar.open(error.error.error.mensaje, "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
    });

    //this.contactForm.clearValidators();

  }

  isPassEmpty() {
    return this.f.pass.value.toString().length === 0;
  }

  getErrorPass() {
    return !this.isPassEmpty() && this.f.pass.errors !== null;
  }

  // mensajes de error password
  getPassErrorMessage() {
    if (this.f.pass.hasError('required')) {
      return 'Debe ingresar su contraseña';
    }
    if (this.getErrorPass()){
      return 'Debe ingresar una contraseña valido';
    }
  }

  isUserEmpty() {
    return this.f.user.value.toString().length === 0;
  }

  getErrorUser() {
    return !this.isUserEmpty() && this.f.user.errors !== null;
  }

  // mensajes de error user
  getUserErrorMessage() {
    if (this.f.user.hasError('required')) {
      return 'Debe ingresar su usuario';
    }
    if (this.getErrorUser()){
      return 'Debe ingresar un usuario valido';
    }
  }
}
