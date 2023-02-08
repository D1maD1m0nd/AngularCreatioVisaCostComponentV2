import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { AngularVisaCostComponent } from './components/angular-visa-cost/angular-visa-cost.component';
import {CookieService} from "ngx-cookie-service";
import { SavedGroupVisaComponent } from './components/saved-group-visa/saved-group-visa.component';
import {MatButtonModule} from "@angular/material/button";
@NgModule({
  declarations: [
    AppComponent,
    AngularVisaCostComponent,
    SavedGroupVisaComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AgGridModule,
        MatButtonModule
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
