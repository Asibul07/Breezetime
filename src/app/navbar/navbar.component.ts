import { Component, EventEmitter, Output } from '@angular/core';
import { LightDarkToggleComponent } from '../light-dark-toggle/light-dark-toggle.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title: string = 'Breezetime';
  socialLinks = [
    {
      name: 'GitHub Repository',
      icon: 'bi bi-code-slash',
      url: 'https://github.com/Asibul07/Breezetime',
    },
    {
      name: 'Facebook',
      icon: 'bi-facebook',
      url: 'https://www.facebook.com/tagim.cms.7',
    },
    {
      name: 'LinkedIn',
      icon: 'bi-linkedin',
      url: 'https://www.linkedin.com/in/asibul/',
    },
    {
      name: 'Instagram',
      icon: 'bi-instagram',
      url: 'https://www.instagram.com',
    },
    {
      name: 'GitHub',
      icon: 'bi-github',
      url: 'https://github.com/Asibul07/XvsO',
    },
  ];
}
