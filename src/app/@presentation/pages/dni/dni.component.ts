import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoServices} from '../../../@data/services/pago.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css']
})
export class DniComponent implements OnInit {

  contactForm: FormGroup;
  isLoading = false;
  mobile: boolean = false;
  tipoCampo: number = 0;


  constructor(private formBuilder: FormBuilder, private router: Router, private pagoServices: PagoServices, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]\d*$/) ]],
    });

    var ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.mobile = true;
    }
    // localStorage.removeItem('token');
    localStorage.removeItem('dni');
    sessionStorage.clear();
  }

  get f() { return this.contactForm.controls; }

  // accion formulario
  onSubmit() {
    this.isLoading = true;
    var valor =  this.f.dni.value;
    this.pagoServices.consultar(valor, 2).subscribe(result => {
      this.isLoading = false;
      this.router.navigate(['pages/suministros', result[0].nroDocumentoPropietario ]);
    },
    error => {
      this.isLoading = false;
      this._snackBar.open(error.error.error.mensaje, "", { duration: 3000, panelClass: ['bg-danger', 'color-white'] });
    });
    this.contactForm.clearValidators();
  }

  isDniEmpty() {
    return this.f.dni.value.toString().length === 0;
  }

  getErrorDni() {
    return !this.isDniEmpty() && this.f.dni.errors !== null;
  }

  // Mensajes de error input
  getDniErrorMessage() {
    if (this.f.dni.hasError('required')) {
      return 'Debe ingresar su DNI';
    }
    if (this.getErrorDni()){
      return 'Debe ingresar un DNI valido';
    }
  }

}
