import { Component, OnInit,Inject } from '@angular/core';
import {Router} from '@angular/router';
import { PagoServices} from '../../../@data/services/pago.service';
import { AuthenticationService} from '../../../@data/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {NbDialogService, NbIconLibraries, NbMediaBreakpointsService, NbThemeService, NB_DIALOG_CONFIG} from '@nebular/theme';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})

export class ListadoComponent implements OnInit {

  totalRegistros: number;
  lista: any [] = [];
  page: number = 1;
  isLoading: boolean = true;
  no_data : boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private pagoService: PagoServices,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dialogService: NbDialogService,
    iconsLibrary:  NbIconLibraries,
  ) { }

  ngOnInit(): void {
    this.totalRegistros = 3;
    this.listarNoProcesados();

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/pages/pago']);
  }

  listarNoProcesados() {
    var token = localStorage.getItem('token');
    this.pagoService.listarNoProcesados(token)
    .subscribe(
      (data: any) => {
        if(data.length == 0) {
          this.no_data = false;
        }
        this.lista = data;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this._snackBar.open(error.error.error.mensaje, "", { duration: 10000, panelClass: ['bg-danger', 'color-white'] });
      },
    );
  }

  pagoNoProcesado(nropedido: number) {
    var token = localStorage.getItem('token');
    this.pagoService.pagoNoProcesados(token, nropedido)
    .subscribe(
      result => {
        this._snackBar.open(result.mensaje, "", { duration: 20000, panelClass: ['bg-secondary-custom', 'color-white'] });
        location.reload();
      },
      error => {
        console.log('Error');
        this._snackBar.open(error.error.title, "", { duration: 20000, panelClass: ['bg-danger', 'color-white'] });
      },
    );
  }


}
