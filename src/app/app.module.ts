import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularVisaCostComponent } from './components/angular-visa-cost/angular-visa-cost.component';
import { HttpClientServiceComponent } from './services/http-client-service/http-client-service.component';
import { ErrorServiceComponent } from './services/error-service/error-service.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularVisaCostComponent,
    HttpClientServiceComponent,
    ErrorServiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
