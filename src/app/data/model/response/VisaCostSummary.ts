import {ICostColumn} from "./CostColumn";
import {ICostItem} from "./ItemCost";
import {IMetaData} from "./MetaData";
import {ISummaryData} from "./SummaryData";

export interface IVisaCostSummary {
    SaveLocal: boolean
    CostItemColumn: ICostColumn[]
    CostItemsResult: ICostItem[]
    MetaData: IMetaData
    SummaryData: ISummaryData
    Error: string | null
    TableVisaId: string
}
