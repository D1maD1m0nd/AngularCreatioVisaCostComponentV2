import {ICostColumn} from "../../data/model/response/CostColumn";
import {ColDef} from "ag-grid-community";
import {editableColumn, invisibleColumn} from "../constants/ConfigurationColumnsConstants";


export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance: any): ColDef[] {
    return CostItemColumn.map((i) => {
            const isString = typeof instance[i.ItemCostKey] === 'string';
            const isInvisible = invisibleColumn.includes(i.ItemCostKey);
            const isEditable = editableColumn.includes(i.ItemCostKey);
            return <ColDef>{
                cellStyle: params => {
                    if(params.data) {
                        if (params.data.TotalSumPlanYearBranch < params.data.TotalSumPlan) {
                            return {background: 'aquamarine'}
                        } else if (params.data.TotalSumPlanYearBranch > params.data.TotalSumPlan) {
                            return {background: 'rgba(255, 51, 144, 0.32)'}
                        }
                    }
                    return null
                },
                field: i.ItemCostKey,
                headerName: i.Name,
                editable: isEditable,
                enableRowGroup: isString,
                filter: isString ? 'agSetColumnFilter' : null,
                aggFunc: !isString ? 'sum' : null,
                hide: isInvisible,
                valueParser: !isString ? 'Number(newValue)' : null,
                cellClass: !isString ? 'number-cell' : null,
                cellRenderer: !isString ? 'agAnimateShowChangeCellRenderer' : null,
            }
        }
    );
}
