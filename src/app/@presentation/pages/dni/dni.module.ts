import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DniComponent } from './dni.component';

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
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DniComponent],
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
    CommonComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ]
})
export class DniModule { }
