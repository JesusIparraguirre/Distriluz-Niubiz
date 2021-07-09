import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarCardComponent } from './navbar-card/navbar-card.component';
import {DialogGenericComponent} from './dialog-generic/dialog-generic.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSpinnerModule,
  NbUserModule,
  NbSelectModule,
  NbDialogModule,
} from '@nebular/theme';

import { RouterModule } from '@angular/router';
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
import { CreditCardDirectivesModule } from 'angular-cc-library';
import {NbSecurityModule} from '@nebular/security';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { from } from 'rxjs';
import { TerminosComponent } from './terminos/terminos.component';
import {MatDialogModule} from '@angular/material/dialog';

// import { from } from 'rxjs';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavbarCardComponent,DialogGenericComponent, TerminosComponent],
  imports: [
    CommonModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbIconModule,
    NbLayoutModule,
    NbMenuModule,
    NbSpinnerModule,
    NbUserModule,
    NbSelectModule,
    NbSecurityModule,
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
    RouterModule,
    CreditCardDirectivesModule,
    NbDialogModule,
    MatDialogModule,
  ],
  exports: [CommonModule, FooterComponent, FooterComponent, HeaderComponent,NavbarCardComponent,DialogGenericComponent],
  entryComponents: [DialogGenericComponent, TerminosComponent],
})
export class CommonComponentsModule { }
