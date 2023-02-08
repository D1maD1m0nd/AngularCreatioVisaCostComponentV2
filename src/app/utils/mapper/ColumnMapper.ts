import {ICostColumn} from "../../data/model/response/CostColumn";
import {ColDef} from "ag-grid-community";

const invisibleColumn : string[] = [
  "DetailBudgetId",
  "YearName",
  "BrandName"
]
export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance : any) : ColDef[] {
  return CostItemColumn.map((i) =>{
      const isString = typeof instance[i.ItemCostKey] === 'string';
      const isInvisible = invisibleColumn.includes(i.ItemCostKey);
      return <ColDef> {
        field: i.ItemCostKey,
        headerName: i.Name,
        editable: !isString,
        enableRowGroup: isString,
        filter: isString ? 'agSetColumnFilter' : null,
        aggFunc: !isString ? 'sum' : null,
        hide: isInvisible
      }
    }
  );
}
