import {ICostColumn} from "./CostColumn";
import {ICostItem} from "./ItemCost";
import {IMetaData} from "./MetaData";
import {ISummaryData} from "./SummaryData";
import {IShareFilialItem} from "./ShareFilialItem";

export interface IVisaCostSummary {
    SaveLocal: boolean
    CostItemColumn: ICostColumn[]
    CostItemsResult: ICostItem[]
    MetaData: IMetaData
    ShareFilialItems: IShareFilialItem[]
    SummaryData: ISummaryData
    Error: string | null
    TableVisaId: string
}
