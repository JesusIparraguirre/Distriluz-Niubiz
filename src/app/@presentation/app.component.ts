import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  private router: Router;
  title = 'NiubizWebAngular';
}
