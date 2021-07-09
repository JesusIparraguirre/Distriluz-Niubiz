import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {NbThemeModule} from '@nebular/theme';
import {
  NbDialogModule,
} from '@nebular/theme';
import {PagesModule} from './pages/pages.module';
import {AuthModule} from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DomainModule} from "../@domain/domain.module";
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbDialogModule.forRoot(),
    HttpClientModule,
    RouterModule,
    DomainModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
