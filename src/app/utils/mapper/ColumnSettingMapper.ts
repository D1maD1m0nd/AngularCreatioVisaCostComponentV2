import {ICostColumn} from "../../data/model/response/CostColumn";
import {ColumnState} from "ag-grid-community";
import {ColumnSetting} from "../../data/model/util/ColumnSetting";

export function CostItemColumnToColumnSettings(itemCost: ICostColumn | undefined, itemState: ColumnState | null | undefined): ColumnSetting {
    return {
        hide: itemState?.hide ? itemState.hide : false,
        sort: itemState?.sort ? itemState.sort : null,
        sortIndex: itemState?.sortIndex ? itemState.sortIndex : null,
        width: itemState?.width ? itemState.width : null,
        key: itemCost?.ItemCostKey ? itemCost?.ItemCostKey : "",
        name: itemCost?.Name ? itemCost?.Name : ""
    }
}


