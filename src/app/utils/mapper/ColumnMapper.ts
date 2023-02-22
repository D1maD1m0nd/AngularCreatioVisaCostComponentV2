import {ICostColumn} from "../../data/model/response/CostColumn";
import {CellClassParams, ColDef, ValueFormatterParams, ValueGetterParams} from "ag-grid-community";
import {
    aggGetterColumns,
    colorStatus,
    editableColumn,
    invisibleColumn
} from "../constants/ConfigurationColumnsConstants";
import {formatNumber} from "../Helper/StringHelper";


export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance: any): ColDef[] {
    return CostItemColumn.map((i: ICostColumn) => {
            const isString = typeof instance[i.ItemCostKey] === 'string';
            const isNumber = typeof instance[i.ItemCostKey] === 'number';
            const isBoolean = typeof instance[i.ItemCostKey] == 'boolean';
            const isInvisible = invisibleColumn.includes(i.ItemCostKey);
            const isEditable = editableColumn.includes(i.ItemCostKey);
            const isAggGetter = aggGetterColumns.includes(i.ItemCostKey);
            return getColDef(isString, isNumber, isBoolean, isInvisible, isEditable, isAggGetter, i);
        }
    );
}

function getColDef(isString: boolean,
                   isNumber: boolean,
                   isBoolean: boolean,
                   isInvisible: boolean,
                   isEditable: boolean,
                   isAggGetter: boolean,
                   item: ICostColumn): ColDef {

    const colDef = <ColDef>{
        cellStyle: params => getCellStyle(params),
        cellClass: params => getCellClass(params, isNumber),
        valueFormatter: params => getValueFormatter(params, item, isNumber),
        field: item.ItemCostKey,
        headerName: item.Name,
        editable: isEditable,
        enableRowGroup: isString,
        filter: isString ? 'agSetColumnFilter' : null,
        aggFunc: isNumber ? 'sum' : null,
        hide: isInvisible,
        valueParser: isNumber ? params => Number(params.newValue) : null,
        cellRenderer: getCellRender(isNumber, isBoolean),
    };
    if (isAggGetter) {
        colDef.valueGetter = params => getValueGetter(item.ItemCostKey, params);
    }
    return colDef;
}

function getValueGetter(key: string, params: ValueGetterParams<any>) {
    switch (key) {
        case "DeltaChanged":
            const newSum = params.data.FirstQuarterNewSum +
                params.data.SecondQuarterNewSum +
                params.data.ThirdQuarterNewSum +
                params.data.FourthQuarterNewSum;
            const newSumFilial = params.data.FirstQuarterPlanSumBranch +
                params.data.SecondQuarterPlanSumBranch +
                params.data.ThirdQuarterPlanSumBranch +
                params.data.FourthQuarterPlanSumBranch;
            return newSum - newSumFilial;
        default:
            console.log(params);
            return params.data[key];
    }
}

function getCellRender(isNumber: boolean, isBoolean: boolean) {
    if (isNumber) {
        return 'agAnimateShowChangeCellRenderer';
    } else if (isBoolean) {
        return 'checkboxRenderer';
    }
    return null;
}

function getCellStyle(params: CellClassParams<any, any>,) {
    if (params.data) {
        if (params.data.TotalSumPlanYearBranch < params.data.TotalSumPlan) {
            return colorStatus.Positive;
        } else if (params.data.TotalSumPlanYearBranch > params.data.TotalSumPlan) {
            return colorStatus.Negative;
        }
    }
    return null
}

function getCellClass(params: CellClassParams<any, any>, isNumber: boolean) {
    const isFooter = params.node.footer;
    if (isFooter) {
        return 'number-cell-footer-bold';
    }
    if (isNumber) {
        return 'number-cell';
    }

    return null;
}

function getValueFormatter(params: ValueFormatterParams<any, any>, item: ICostColumn, isNumber: boolean) {
    const value = params.value;
    return formatNumber(value);
}
