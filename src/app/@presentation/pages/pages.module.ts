import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';

import {ThemeModule} from '../@theme/theme.module';
import {NbContextMenuModule, NbLayoutModule, NbMenuModule, NbUserModule} from '@nebular/theme';

import {MatGridListModule} from '@angular/material/grid-list';
import { SuministroModule } from './suministro/suministro.module';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ProcesopagoComponent } from './procesopago/procesopago.component';
import { SuministrosComponent } from './suministros/suministros.component';
import {ReciboModule} from './recibo/recibo.module';
import {ListadoModule} from './listado/listado.module';
import {DniModule} from './dni/dni.module';
import { AppLoaderModule } from '../app-loader/app-loader.module';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [PagesComponent, SuministrosComponent, ProcesopagoComponent],
  exports: [ PagesComponent, SuministrosComponent, ProcesopagoComponent ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SuministroModule,
    ReciboModule,
    ListadoModule,
    DniModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSnackBarModule,
    CreditCardDirectivesModule,
    AppLoaderModule,
    MatDialogModule,
    ThemeModule,
    NbContextMenuModule,
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
  ],
  providers: [],
})
export class PagesModule { }
