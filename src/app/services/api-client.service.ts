import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";
import {ICostVisaRequestData} from "../data/model/request/ICostVisaRequestData";
import {catchError, Observable, throwError} from "rxjs";
import {BuildTypes} from "../../environments/BuildTypes";
import {environment} from "../../environments/environment";
import {ICostVisaSaveData} from "../data/model/request/ICostVisaSaveData";
import {ICostVisaSaveItem} from "../data/model/request/ICostVisaSaveItem";
import {CookieService} from "ngx-cookie-service";
import {ErrorService} from "./error.service";
import {ToSaveCostData} from "../utils/mapper/CostVisaMapper";
import {ICostItem} from "../data/model/response/ItemCost";

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    VisaCostSummarySave: Map<string, number> = new Map();
    BASE_URL = environment.apiUrl
    BPM_CSRF_TOKEN: string

    constructor(
        private http: HttpClient,
        private errorService: ErrorService,
        private cookieService: CookieService) {
        if (environment.buildType == BuildTypes.CREATIO) {
            const url = window.location['origin'];
            const token = this.cookieService.get('BPMCSRF');
            this.BPM_CSRF_TOKEN = token;
            this.BASE_URL = `${url}/0`
            console.log(token);
        }
    }

    UpdateRecordsDetailBudgetSum(UpdateItems: ICostItem[]) {
        let url;
        if (environment.buildType == BuildTypes.CREATIO) {
            url = `${this.BASE_URL}/rest/VisaCostItemWebService/UpdateRecordsDetailBudgetSum`
        } else {
            url = `${this.BASE_URL}/ServiceModel/VisaCostItemWebService.svc/UpdateRecordsDetailBudgetSum`
        }
        const data = ToSaveCostData(UpdateItems, true);
        const headers = this.GetHeaders()
        return this.http.post(
            url,
            data,
            {
                headers: headers
            }
        );
    }
    UpdateCostVisa(UpdateItems: ICostItem[]): Observable<any> {
        let url;
        if (environment.buildType == BuildTypes.CREATIO) {
            url = `${this.BASE_URL}/rest/VisaCostItemWebService/UpdateCostVisa`
        } else {
            url = `${this.BASE_URL}/ServiceModel/VisaCostItemWebService.svc/UpdateCostVisa`
        }
        const data = ToSaveCostData(UpdateItems, false);
        const headers = this.GetHeaders()
        return this.http.post(
            url,
            data,
            {
                headers: headers
            }
        );
    }

    GetVisaSummary(YearId: string | null, BrandId: string | null): Observable<IVisaCostSummary> {
        let url;
        console.log()
        if (environment.buildType == BuildTypes.CREATIO) {
            url = `${this.BASE_URL}/rest/VisaCostItemWebService/GetVisaItems`
        } else {
            url = `${this.BASE_URL}/ServiceModel/VisaCostItemWebService.svc/GetVisaItems`
        }
        const data: ICostVisaRequestData = {
            yearBudgetId: YearId,
            brandBudgetId: BrandId
        };
        const headers = this.GetHeaders();
        return this.http.post<IVisaCostSummary>(
            url,
            data,
            {
                headers: headers
            })
            .pipe(
                catchError(this.errorHandler.bind(this))
            );
    }


    private GetHeaders(): HttpHeaders {
        if (environment.buildType == BuildTypes.CREATIO) {
            return new HttpHeaders().set(
                'BPMCSRF', this.BPM_CSRF_TOKEN
            );
        } else {
            return new HttpHeaders()
        }
    }

    private errorHandler(error: HttpErrorResponse) {
        this.errorService.handler(error.message)
        return throwError(() => error.message)
    }
}
