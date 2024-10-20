// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { PrimaryClockComponent } from './primary-clock/primary-clock.component';
import { WeatherService } from './services/weather.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecondaryClockComponent } from './secondary-clock/secondary-clock.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component';

@NgModule({
  declarations: [AppComponent, PrimaryClockComponent, SecondaryClockComponent, NavbarComponent, LightDarkToggleComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [WeatherService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
