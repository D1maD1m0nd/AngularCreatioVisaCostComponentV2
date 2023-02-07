import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { AngularVisaCostComponent } from './components/angular-visa-cost/angular-visa-cost.component';
import {CookieService} from "ngx-cookie-service";
@NgModule({
  declarations: [
    AppComponent,
    AngularVisaCostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
