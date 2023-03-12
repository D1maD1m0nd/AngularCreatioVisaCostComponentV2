import {ApiClientService} from "../services/api-client.service";
import {LocalStorageService} from "../services/local-storage.service";
import {IVisaRepository} from "./IVisaRepository";
import {ICostItem} from "../data/model/response/ItemCost";
import {Observable, Subject} from "rxjs";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";
import {Injectable} from "@angular/core";
import {ColumnState} from "ag-grid-community";

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

    ClearUpdateItemStorage(): void {
        const keyLocalStore = this.visaSummaryData.TableVisaId;
        const keySavedVisaCost = `saved_visa_cost_data_${keyLocalStore}`;
        this.storageService.removeItem(keySavedVisaCost)
    }

    GetShareFilialSumByName(filialName: string): number {
        const findResult = this.visaSummaryData.ShareFilialItems.find(item => item.FilialName == filialName);
        return findResult ? findResult.ShareFilialSum : 0.0;
    }

    AddUpdateItem(item: ICostItem): void {
        const key = `saved_visa_cost_data_${this.visaSummaryData.TableVisaId}`;
        let savedData = this.storageService.getItem(key);
        const isArray = savedData && savedData instanceof Array
        let updateItems: ICostItem[] = isArray ? savedData : [];
        const replacedIndex = updateItems.findIndex((itemUpdate: ICostItem) => item.VisaId == itemUpdate.VisaId);
        if (replacedIndex != -1) {
            updateItems[replacedIndex] = item
        } else {
            updateItems.push(item);
        }
        this.storageService.setItem(key, updateItems)
    }

    GetVisaSummary(YearId: string | null, BrandId: string | null, Filial: string | null, TableVisaId: string | null): void {
        const localData = this.storageService.getItem(TableVisaId);
        if (localData && localData.SaveLocal) {
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
        const key = `saved_visa_cost_data_${this.visaSummaryData.TableVisaId}`
        const savedData = this.storageService.getItem(key)
        return this.apiService.UpdateRecordsDetailBudgetSum(savedData);
    }

    UpdateCostVisa(): Observable<any> {
        this.visaSummaryData.SaveLocal = false
        const key = `saved_visa_cost_data_${this.visaSummaryData.TableVisaId}`
        const savedData = this.storageService.getItem(key)
        return this.apiService.UpdateCostVisa(savedData);
    }

    SaveCostItemsToLocalStore(costVisaItems: ICostItem[]): void {
        this.visaSummaryData.CostItemsResult = costVisaItems
        this.visaSummaryData.SaveLocal = true
        this.storageService.setItem(this.visaSummaryData.TableVisaId, this.visaSummaryData)
    }

    SaveColumnDefToLocalStore(columnState: ColumnState[]): void {
        this.storageService.setItem("ColumnState", columnState)
    }

    GetColumnDefToLocalStore(): ColumnState[] | null {
        return this.storageService.getItem("ColumnState")
    }

    ClearStorage(): void {
        const keySavedVisaCost = `saved_visa_cost_data_${this.visaSummaryData.TableVisaId}`;
        const keyLocalStore = this.visaSummaryData.TableVisaId;
        this.storageService.removeItem(keySavedVisaCost)
        this.storageService.removeItem(keyLocalStore)
    }
}
