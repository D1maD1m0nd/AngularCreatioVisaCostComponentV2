import {ApiClientService} from "../services/api-client.service";
import {LocalStorageService} from "../services/local-storage.service";
import {IVisaRepository} from "./IVisaRepository";
import {ICostItem} from "../data/model/response/ItemCost";
import {Observable} from "rxjs";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class VisaRepository implements IVisaRepository {
    constructor(private apiService: ApiClientService, private storageService: LocalStorageService) {
    }

    AddUpdateItem(item: ICostItem): void {
        return this.apiService.AddUpdateItem(item);
    }

    GetVisaSummary(YearId: string | null, BrandId: string | null, Filial: string | null, TableVisaId: string | null): Observable<IVisaCostSummary> {
        return this.apiService.GetVisaSummary(YearId, BrandId, Filial, TableVisaId);
    }

    UpdateRecordsDetailBudgetSum(): Observable<any> {
        return this.apiService.UpdateRecordsDetailBudgetSum();
    }

    UpdateCostVisa(): Observable<any> {
        return this.apiService.UpdateCostVisa();
    }

    SaveDataToLocalStore(item: IVisaCostSummary): void {
        this.storageService.setItem(item.TableVisaId, item)
    }
}
