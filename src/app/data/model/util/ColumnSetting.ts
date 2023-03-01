import {SortDirection} from "ag-grid-community/dist/lib/entities/colDef";

export class ColumnSetting {
    key: string
    name: string
    hide: boolean
    sort: SortDirection | null
    sortIndex: number | null
    width: number | null
}
