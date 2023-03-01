import {ICostColumn} from "../../data/model/response/CostColumn";
import {CellClassParams, ColDef, ColumnState, ValueFormatterParams, ValueGetterParams} from "ag-grid-community";
import {
    aggGetterColumns,
    colorStatus,
    editableColumn,
    invisibleColumn
} from "../constants/ConfigurationColumnsConstants";
import {formatNumber} from "../Helper/StringHelper";
import {CostItemColumnToColumnSettings} from "./ColumnSettingMapper";
import {ColumnSetting} from "../../data/model/util/ColumnSetting";
import {sortedColSettingsByColState} from "../sorted/SortedColumn";


export function ToColumnDefArr(CostItemColumn: ICostColumn[], instance: any, localStoreState: ColumnState[] | null | undefined): ColDef[] {
    let columnSettings = CostItemColumn?.map(item => {
        const findItem = localStoreState?.find(i => i.colId == item.ItemCostKey)
        return CostItemColumnToColumnSettings(item, findItem)
    });
    if (localStoreState) {
        columnSettings = sortedColSettingsByColState(columnSettings, localStoreState)
    }
    return columnSettings.map((i: ColumnSetting) => {
            const isString = typeof instance[i.key] === 'string';
            const isNumber = typeof instance[i.key] === 'number';
            const isBoolean = typeof instance[i.key] == 'boolean';
            const isInvisible = invisibleColumn.includes(i.key);
            const isEditable = editableColumn.includes(i.key);
            const isAggGetter = aggGetterColumns.includes(i.key);
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
                   item: ColumnSetting): ColDef {

    const colDef = <ColDef>{
        cellStyle: params => getCellStyle(params),
        cellClass: params => getCellClass(params, isNumber),
        valueFormatter: params => getValueFormatter(params),
        field: item.key,
        headerName: item.name,
        editable: isEditable,
        enableRowGroup: isString,
        filter: isString ? 'agSetColumnFilter' : null,
        aggFunc: isNumber ? 'sum' : null,
        hide: item.hide || isInvisible,
        valueParser: isNumber ? params => Number(params.newValue) : null,
        cellRenderer: getCellRender(isNumber, isBoolean),
    };
    item?.width ? colDef.width = item.width : null;
    item?.sort ? colDef.sort = item.sort : null;
    item?.sortIndex ? colDef.sortIndex = item.sortIndex : null;
    isAggGetter ? colDef.valueGetter = params => getValueGetter(item.key, params) : null;

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
        case "TotalYearNewSum":
            return params.data.FirstQuarterNewSum +
                params.data.SecondQuarterNewSum +
                params.data.ThirdQuarterNewSum +
                params.data.FourthQuarterNewSum
        default:

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
    if (params.node.group && !params.node.footer) {
        return colorStatus.Group;
    }
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
        if (isNumber) {
            return 'number-cell-footer-bold number-cell';
        } else {
            return 'number-cell-footer-bold';
        }
    }
    if (isNumber) {
        return 'number-cell';
    }

    return null;
}

function getValueFormatter(params: ValueFormatterParams) {
    const value = params.value;
    return formatNumber(value);
}


