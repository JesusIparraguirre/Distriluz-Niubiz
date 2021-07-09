import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { PagoServices} from '../../../@data/services/pago.service';
import { Suministro } from '../../../@data/models/Suministro';

@Component({
  selector: 'app-suministro',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {

  dni: string;
  nombre: string;
  suministros: Suministro[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private pagoServices: PagoServices) { }


  ngOnInit() {
    sessionStorage.clear();
    // location.reload();

    this.route.params.subscribe(params => {
      this.dni = this.route.snapshot.paramMap.get('dni');
    });

    this.pagoServices.validarDni(this.dni).subscribe(result => {
      this.nombre = result[0].nombreNroServicio;
      this.suministros = result;
    });
  }

  irProcesoPago(nrosuministro: number){
    this.router.navigate(['pages/procesopago', nrosuministro ]);
  }

}
