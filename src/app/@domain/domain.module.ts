import { NgModule, ModuleWithProviders, Optional, SkipSelf,} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationRepository} from "./repository/authentication.repository";
import { AuthenticationService} from "../@data/services/authentication.service";
import {PagoRepository} from './repository/pago.repository';
import {PagoServices} from '../@data/services/pago.service';
// import {throwIfAlreadyLoaded} from "./module-import-guard";

const DATA_SERVICES = [
  { provide: AuthenticationRepository, useClass: AuthenticationService },
  { provide: PagoRepository, useClass: PagoServices },
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DomainModule { 
  // constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
  //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
  // }

  // static forRoot(): ModuleWithProviders {
  //   return <ModuleWithProviders>{
  //     ngModule: DomainModule,
  //     providers: [
  //       ...DATA_SERVICES,
  //     ],
  //   };
  // }
}
