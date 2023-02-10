import {ICostColumn} from "../../data/model/response/CostColumn";
import {ColDef} from "ag-grid-community";
import {colorStatus, editableColumn, invisibleColumn} from "../constants/ConfigurationColumnsConstants";


export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance: any): ColDef[] {
    return CostItemColumn.map((i) => {
            const isString = typeof instance[i.ItemCostKey] === 'string';
            const isNumber = typeof instance[i.ItemCostKey] === 'number';
            const isBoolean = typeof instance[i.ItemCostKey] == 'boolean';
            const isInvisible = invisibleColumn.includes(i.ItemCostKey);
            const isEditable = editableColumn.includes(i.ItemCostKey);
            const cellRender = function () {
                if (isNumber) {
                    return 'agAnimateShowChangeCellRenderer';
                } else if (isBoolean) {
                    return 'checkboxRenderer';
                }
                return null;
            }
            const renderType = cellRender();
            return <ColDef>{
                cellStyle: params => {
                    if (params.data) {
                        if (params.data.TotalSumPlanYearBranch < params.data.TotalSumPlan) {
                            return colorStatus.Positive;
                        } else if (params.data.TotalSumPlanYearBranch > params.data.TotalSumPlan) {
                            return colorStatus.Negative;
                        }
                    }
                    return null
                },
                field: i.ItemCostKey,
                headerName: i.Name,
                editable: isEditable,
                enableRowGroup: isString,
                filter: isString ? 'agSetColumnFilter' : null,
                aggFunc: isNumber ? 'sum' : null,
                hide: isInvisible,
                valueParser: isNumber ? 'Number(newValue)' : null,
                cellClass: isNumber ? 'number-cell' : null,
                cellRenderer: renderType,
            }
        }
    );
}
