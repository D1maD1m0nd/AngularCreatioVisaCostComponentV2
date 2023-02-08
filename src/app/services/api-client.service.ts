import { Injectable } from '@angular/core';
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
import {tap} from "rxjs/operators";

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

  AddSaveData(id: string, sum: number) {
    console.log(`AddSave Data ${id}, ${sum}`);
    this.VisaCostSummarySave.set(id, sum);
  }

  ClearSaveData() {
    this.VisaCostSummarySave.clear();
  }

  private PrepareDataBeforeSave(): ICostVisaSaveData {
    const saveDataArray: ICostVisaSaveItem[] = [];
    this.VisaCostSummarySave.forEach((value, key) => {
      saveDataArray.push({
          Id: key,
          TotalSumPlan: value
        }
      );
    });
    return {
      CostItemData: saveDataArray
    };
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

  PostSaveDataBudgetDetail(): Observable<any> {
    let url;
    if (environment.buildType == BuildTypes.CREATIO) {
      url = `${this.BASE_URL}/rest/VisaCostItemWebService/UpdateRecordsDetailBudgetSum`
    } else {
      url = `${this.BASE_URL}/ServiceModel/VisaCostItemWebService.svc/UpdateRecordsDetailBudgetSum`
    }
    const data = this.PrepareDataBeforeSave()
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
    // "yearBudgetId": "42533c5f-b173-4386-a1d9-8e02e5b91d4d",
    //     "brandBudgetId": "f4c9e1ef-167e-4aef-b2c1-56950486df79"
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handler(error.message)
    return throwError(() => error.message)
  }
}
