import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularVisaCostComponent } from './components/angular-visa-cost/angular-visa-cost.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularVisaCostComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
