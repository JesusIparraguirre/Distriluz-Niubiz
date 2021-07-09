import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {SuministroComponent} from './suministro/suministro.component';
import {ListadoComponent} from './listado/listado.component';
import {SuministrosComponent} from './suministros/suministros.component';
import {ProcesopagoComponent} from './procesopago/procesopago.component';
import { ReciboComponent } from './recibo/recibo.component';
import {DniComponent} from './dni/dni.component';
import {AuthGuard} from '../../@data/interceptors/auth.guard';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'suministro',
        component: SuministroComponent,
      },
      { path: 'suministros/:dni', component: SuministrosComponent },
      { path: 'procesopago/:nrosuministro', component: ProcesopagoComponent },
      {
        path: 'listado',
        canActivate: [AuthGuard],
        component: ListadoComponent,
      },
      {
        path: 'recibo/:transactionId/:purchaseNumber/:amount/:email/:suministro/:periodos/:idempresa',
        component: ReciboComponent,
      },
      {
        path: 'dni',
        component: DniComponent,
      },
      {
        path: '',
        redirectTo: 'suministro',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'pages' },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PagesRoutingModule {
  }
