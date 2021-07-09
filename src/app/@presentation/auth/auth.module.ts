import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginModule } from './login/login.module';
import {AuthRoutingModule} from './auth-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {NbContextMenuModule, NbLayoutModule, NbMenuModule, NbUserModule} from '@nebular/theme';

// import {DomainModule} from "../../@domain/domain.module";


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    LoginModule,
    AuthRoutingModule,
    CommonComponentsModule,
    MatGridListModule,
    NbContextMenuModule,
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    // DomainModule
  ]
})
export class AuthModule { }
