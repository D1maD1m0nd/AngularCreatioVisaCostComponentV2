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

import { HeaderGroupVisaComponent } from './components/header-group-visa/header-group-visa.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
@NgModule({
  declarations: [
    AppComponent,
    AngularVisaCostComponent,
    SavedGroupVisaComponent,
    HeaderGroupVisaComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AgGridModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
