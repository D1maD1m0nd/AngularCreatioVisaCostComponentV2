import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from '@angular/common/http'
import {AgGridModule} from 'ag-grid-angular';
import {VltVisaCostComponent} from './app.component';
import {AngularVisaCostComponent} from './components/angular-visa-cost/angular-visa-cost.component';
import {CookieService} from "ngx-cookie-service";
import {SavedGroupVisaComponent} from './components/saved-group-visa/saved-group-visa.component';
import {MatButtonModule} from "@angular/material/button";

import {HeaderGroupVisaComponent} from './components/header-group-visa/header-group-visa.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {createCustomElement} from "@angular/elements";
import {CheckboxRenderComponent,} from './components/checkbox-render-component/checkbox-render.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HeaderTotalBudgetComponent} from './components/header-total-budget/header-total-budget.component';
import {HeaderContainerComponent} from './components/header-container/header-container.component';
import {InformationDialogComponent} from './components/information-dialog/information-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {LocalStorageService} from "./services/local-storage.service";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [
        VltVisaCostComponent,
        AngularVisaCostComponent,
        SavedGroupVisaComponent,
        HeaderGroupVisaComponent,
        CheckboxRenderComponent,
        HeaderTotalBudgetComponent,
        HeaderContainerComponent,
        InformationDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AgGridModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTooltipModule
    ],
    providers: [
        {provide: 'LOCAL_STORAGE', useValue: window.localStorage},
        LocalStorageService,
        CookieService],
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

