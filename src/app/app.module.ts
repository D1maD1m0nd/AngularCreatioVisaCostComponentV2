import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import {VltVisaCostComponent} from './app.component';
import {AngularVisaCostComponent} from './components/angular-visa-cost/angular-visa-cost.component';
import {CookieService} from "ngx-cookie-service";
import {SavedGroupVisaComponent} from './components/saved-group-visa/saved-group-visa.component';
import {MatButtonModule} from "@angular/material/button";

import {HeaderGroupVisaComponent} from './components/header-group-visa/header-group-visa.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {createCustomElement} from "@angular/elements";
import {
    CheckboxRenderComponent,
} from './components/checkbox-render-component/checkbox-render.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
    declarations: [
        VltVisaCostComponent,
        AngularVisaCostComponent,
        SavedGroupVisaComponent,
        HeaderGroupVisaComponent,
        CheckboxRenderComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AgGridModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule
    ],
    providers: [CookieService],
    //пере сборкой компонента необхожимо закомментировать bootstrap Блок
    bootstrap: [VltVisaCostComponent],
    entryComponents: [AngularVisaCostComponent]
})
export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
    }

    ngDoBootstrap(appRef: ApplicationRef): void {
        const el = createCustomElement(AngularVisaCostComponent, {injector: this.injector});
        customElements.define('vlt-summary-visa-cost-component', el);
    }
}

