import {ApiClientService} from "../services/api-client.service";
import {LocalStorageService} from "../services/local-storage.service";
import {IVisaRepository} from "./IVisaRepository";
import {ICostItem} from "../data/model/response/ItemCost";
import {Observable, Subject} from "rxjs";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class VisaRepository implements IVisaRepository {
    private visaSummaryData: IVisaCostSummary
    public visaSummaryDataSubject = new Subject<IVisaCostSummary>()

    constructor(private apiService: ApiClientService, private storageService: LocalStorageService) {
        this.visaSummaryDataSubject.subscribe(item => {
            this.visaSummaryData = item
        });
    }

    GetShareFilialSumByName(filialName: string): number {
        const findResult = this.visaSummaryData.ShareFilialItems.find(item => item.FilialName == filialName);
        return findResult ? findResult.ShareFilialSum : 0.0;
    }

    AddUpdateItem(item: ICostItem): void {
        return this.apiService.AddUpdateItem(item);
    }

    GetVisaSummary(YearId: string | null, BrandId: string | null, Filial: string | null, TableVisaId: string | null): void {
        const localData = this.storageService.getItem(TableVisaId);
        if (localData) {
            console.log("LOCAL STORE");
            this.visaSummaryDataSubject.next(localData)
        } else {
            console.log("REMOTE STORE");
            this.apiService.GetVisaSummary(YearId, BrandId, Filial, TableVisaId).subscribe(i => {
                this.visaSummaryDataSubject.next(i)
            });
        }
    }

    UpdateRecordsDetailBudgetSum(): Observable<any> {
        this.visaSummaryData.SaveLocal = false
        return this.apiService.UpdateRecordsDetailBudgetSum();
    }

    UpdateCostVisa(): Observable<any> {
        this.visaSummaryData.SaveLocal = false
        return this.apiService.UpdateCostVisa();
    }

    SaveDataToLocalStore(costVisaItems: ICostItem[]): void {
        this.visaSummaryData.CostItemsResult = costVisaItems
        this.visaSummaryData.SaveLocal = true
        this.storageService.setItem(this.visaSummaryData.TableVisaId, this.visaSummaryData)
    }
}
