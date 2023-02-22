import {Observable} from "rxjs";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";
import {ICostItem} from "../data/model/response/ItemCost";

export interface IVisaRepository {
    UpdateRecordsDetailBudgetSum() : Observable<any>
    GetVisaSummary(YearId: string | null, BrandId: string | null, Filial: string | null, TableVisaId: string | null): Observable<IVisaCostSummary>
    UpdateRecordsDetailBudgetSum() : Observable<any>
    AddUpdateItem(item : ICostItem) : void
    UpdateCostVisa(): Observable<any>
    SaveDataToLocalStore(item : IVisaCostSummary) : void
}
