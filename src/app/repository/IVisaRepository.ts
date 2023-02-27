import {Observable, Subject} from "rxjs";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";
import {ICostItem} from "../data/model/response/ItemCost";

export interface IVisaRepository {
    visaSummaryDataSubject: Subject<IVisaCostSummary>
    UpdateRecordsDetailBudgetSum(): Observable<any>

    GetVisaSummary(YearId: string | null, BrandId: string | null, Filial: string | null, TableVisaId: string | null): void

    UpdateRecordsDetailBudgetSum(): Observable<any>

    AddUpdateItem(item: ICostItem): void

    UpdateCostVisa(): Observable<any>

    SaveDataToLocalStore(costVisaItems: ICostItem[]): void
}
