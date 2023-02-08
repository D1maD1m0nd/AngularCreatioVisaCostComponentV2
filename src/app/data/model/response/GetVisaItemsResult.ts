import {ICostColumn} from "./CostColumn";
import {ICostItem} from "./ItemCost";
import {IMetaData} from "./MetaData";
import {ISummaryData} from "./SummaryData";
import {ColDef} from "ag-grid-community";

export interface IGetVisaItemsResult {
    CostItemColumn: ICostColumn[]
    CostItemsResult: ICostItem[]
    MetaData: IMetaData
    SummaryData: ISummaryData
    Error: string | null
}

 export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance : any) : ColDef[] {
  return CostItemColumn.map((i) =>
    <ColDef>{
    field: i.ItemCostKey,
    headerName: i.Name,
    enableRowGroup: typeof instance[i.ItemCostKey] === 'string',
    filter: typeof instance[i.ItemCostKey] === 'string' ? 'agSetColumnFilter' : null,
    aggFunc: typeof  instance[i.ItemCostKey] == 'number' ? 'sum' : null
  })
}
