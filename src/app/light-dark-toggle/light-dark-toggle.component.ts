import { Component } from '@angular/core';

@Component({
  selector: 'app-light-dark-toggle',
  templateUrl: './light-dark-toggle.component.html',
  styleUrls: ['./light-dark-toggle.component.scss'],
})
export class LightDarkToggleComponent {
  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}
