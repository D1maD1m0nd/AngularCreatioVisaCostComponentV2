import {ICostColumn} from "../../data/model/response/CostColumn";
import {ColDef} from "ag-grid-community";

const invisibleColumn: string[] = [
    "DetailBudgetId",
    "YearName",
    "BrandName",
    "FirstQuarterPlanSumBranch",
    "SecondQuarterPlanSumBranch",
    "ThirdQuarterPlanSumBranch",
    "FourthQuarterPlanSumBranch"
]

const editableColumn: string[] = [
    "FirstQuarterNewSum",
    "SecondQuarterNewSum",
    "ThirdQuarterNewSum",
    "FourthQuarterNewSum"
]
export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance: any): ColDef[] {
    return CostItemColumn.map((i) => {
            const isString = typeof instance[i.ItemCostKey] === 'string';
            const isInvisible = invisibleColumn.includes(i.ItemCostKey);
            const isEditable = editableColumn.includes(i.ItemCostKey);
            return <ColDef>{
                field: i.ItemCostKey,
                headerName: i.Name,
                editable: isEditable,
                enableRowGroup: isString,
                filter: isString ? 'agSetColumnFilter' : null,
                aggFunc: !isString ? 'sum' : null,
                hide: isInvisible
            }
        }
    );
}
