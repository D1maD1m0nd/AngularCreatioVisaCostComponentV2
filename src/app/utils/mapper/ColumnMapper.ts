import {ICostColumn} from "../../data/model/response/CostColumn";
import {CellClassParams, ColDef, ValueFormatterParams} from "ag-grid-community";
import {colorStatus, editableColumn, invisibleColumn} from "../constants/ConfigurationColumnsConstants";
import {formatNumber} from "../Helper/StringHelper";
import {ICostItem} from "../../data/model/response/ItemCost";


export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance: any): ColDef[] {
    return CostItemColumn.map((i) => {
            const isString = typeof instance[i.ItemCostKey] === 'string';
            const isNumber = typeof instance[i.ItemCostKey] === 'number';
            const isBoolean = typeof instance[i.ItemCostKey] == 'boolean';
            const isInvisible = invisibleColumn.includes(i.ItemCostKey);
            const isEditable = editableColumn.includes(i.ItemCostKey);

            return <ColDef>{
                cellStyle: params => getCellStyle(params),
                field: i.ItemCostKey,
                headerName: i.Name,
                editable: isEditable,
                enableRowGroup: isString,
                filter: isString ? 'agSetColumnFilter' : null,
                aggFunc: isNumber ? 'sum' : null,
                hide: isInvisible,
                valueParser: isNumber ? 'Number(newValue)' : null,
                cellClass: params => getCellClass(params, isNumber),
                cellRenderer: getCellRender(isNumber, isBoolean),
                valueFormatter: params => getValueFormatter(params, i, isNumber)
            }
        }
    );
}

function getValueGetter() {

}
function getCellRender(isNumber : boolean, isBoolean : boolean) {
    if (isNumber) {
        return 'agAnimateShowChangeCellRenderer';
    } else if (isBoolean) {
        return 'checkboxRenderer';
    }
    return null;
}
function getCellStyle(params: CellClassParams<any, any>, ) {
    if (params.data) {
        if (params.data.TotalSumPlanYearBranch < params.data.TotalSumPlan) {
            return colorStatus.Positive;
        } else if (params.data.TotalSumPlanYearBranch > params.data.TotalSumPlan) {
            return colorStatus.Negative;
        }
    }
    return null
}
function getCellClass(params: CellClassParams<any, any>, isNumber : boolean) {
    const isFooter = params.node.footer;
    if (isFooter) {
        return 'number-cell-footer-bold';
    }
    if(isNumber){
        return 'number-cell';
    }

    return null;
}
function getValueFormatter(params: ValueFormatterParams<any, any>, item : ICostColumn, isNumber : boolean) {
    if(params.node?.leafGroup && params.node.group && params.value && typeof params.value == "number") {
        //console.log(params.node)
        return formatNumber(params.value);
    }
    if(isNumber && params.data) {
        const value = params.data[item.ItemCostKey];
        return formatNumber(value);
    }
    return null;
}
