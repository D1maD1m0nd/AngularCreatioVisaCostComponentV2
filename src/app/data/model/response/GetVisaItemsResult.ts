import {ICostColumn} from "./CostColumn";
import {ICostItem} from "./ItemCost";
import {IMetaData} from "./MetaData";
import {ISummaryData} from "./SummaryData";
import {ColDef} from "ag-grid-community";

export class IGetVisaItemsResult {
    CostItemColumn: ICostColumn[]
    CostItemsResult: ICostItem[]
    MetaData: IMetaData
    SummaryData: ISummaryData
    Error: string | null
}
 export function ToColumnDefArr(CostItemColumn: ICostColumn[]) : ColDef[] {
  return CostItemColumn.map((i) => <ColDef>{
    field: i.ItemCostKey,
    headerName: i.Name,
    editable: i.Edit
  })
}
