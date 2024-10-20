import { Component, EventEmitter, Output } from '@angular/core';
import { LightDarkToggleComponent } from '../light-dark-toggle/light-dark-toggle.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title: string = 'Breezetime';
}
