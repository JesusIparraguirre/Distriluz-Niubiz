import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado.component';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSearchModule,
  NbTabsetModule,
  NbSelectModule,
  NbDialogModule,
  NbDialogRef,
  NbDialogService,
  NB_DIALOG_CONFIG,
} from '@nebular/theme';

import { CommonComponentsModule } from '../../common-components/common-components.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import {MatTableModule} from '@angular/material/table';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { DialogGenericComponent } from '../../common-components/dialog-generic/dialog-generic.component';

@NgModule({
  declarations: [ListadoComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    CreditCardDirectivesModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    NbSearchModule,
    NbTabsetModule,
    NbSelectModule,
    MatTableModule,
    MatDialogModule,
    CommonComponentsModule,
    NgbPaginationModule,
    RouterModule,
    NgxPaginationModule,
    NbDialogModule.forRoot(),
  ],
  providers: [
    {
      provide: NbDialogRef,
      useValue: {}
    },
    {provide: NbDialogService, useValue: NB_DIALOG_CONFIG}
 ],
})
export class ListadoModule { }
