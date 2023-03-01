import {ColumnSetting} from "../../data/model/util/ColumnSetting";
import {ColumnState} from "ag-grid-community";

export function sortedColSettingsByColState(sortedArray: ColumnSetting[], bySortedArray: ColumnState[]): ColumnSetting[] {
    const result = [];
    for (const item of bySortedArray) {
        const elem = sortedArray.find(i => i.key == item.colId)
        if (elem) {
            result.push(elem);
            const deletedIndex = sortedArray.indexOf(elem)
            sortedArray.splice(deletedIndex, 1);
        }
    }
    return result
}
