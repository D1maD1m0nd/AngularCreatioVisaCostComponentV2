import {Component, Input, OnInit} from '@angular/core';
import {
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    CellValueChangedEvent,
    ColDef,
    ColumnMovedEvent,
    ColumnResizedEvent,
    ColumnVisibleEvent,
    GridApi,
    GridReadyEvent,
    RowEditingStartedEvent,
    RowEditingStoppedEvent,
} from "ag-grid-community";
import "ag-grid-enterprise"
import {ICostItem} from "../../data/model/response/ItemCost";
import {IVisaCostSummary} from "../../data/model/response/VisaCostSummary";
import {ToColumnDefArr} from "../../utils/mapper/ColumnMapper";
import {IMetaData} from "../../data/model/response/MetaData";
import {CheckboxRenderComponent} from "../checkbox-render-component/checkbox-render.component";
import {ISummaryData} from "../../data/model/response/SummaryData";
import {BridgeServiceService} from "../../services/bridge-service.service";
import {VisaRepository} from "../../repository/VisaRepository";
import {IVisaRepository} from "../../repository/IVisaRepository";
import {ColumnApi} from "ag-grid-community/dist/lib/columns/columnApi";
import {formatNumber} from "../../utils/Helper/StringHelper";

@Component({
    selector: 'app-angular-visa-cost',
    templateUrl: './angular-visa-cost.component.html',
    styleUrls: ['./angular-visa-cost.component.scss']
})
export class AngularVisaCostComponent implements OnInit {
    @Input('year') year: string
    @Input("brand") brand: string
    @Input("filial") filial: string
    @Input("table-visa-id") tableVisaId: string
    public columnDefs: ColDef[];
    public frameworkComponents: any
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    public defaultColDef: ColDef = {
        flex: 1,
        minWidth: 150,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        suppressSizeToFit: true,
        sortable: true,
        resizable: true,
    };
    public autoGroupColumnDef: ColDef = {
        minWidth: 300,
    };
    public rowSelection: 'single' | 'multiple' = 'multiple';
    public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
    public rowDataCostItem!: ICostItem[];
    public metaData: IMetaData
    public summaryData: ISummaryData
    private lastEditingSum: number
    private repository: IVisaRepository

    constructor(repository: VisaRepository,
                private bridgeService: BridgeServiceService) {
        this.frameworkComponents = {
            checkboxRenderer: CheckboxRenderComponent
        };
        this.repository = repository;
        bridgeService.IsApproveButton$.subscribe(i => {
        });
    }

    onColumnMoved(params: ColumnMovedEvent) {
        console.log("ColumnMovedEvent")
        const state = params.columnApi.getColumnState()
        this.repository.SaveColumnDefToLocalStore(state);
    }

    onColumnVisible(params: ColumnVisibleEvent) {
        console.log("ColumnVisibleEvent")
        const state = params.columnApi.getColumnState()
        this.repository.SaveColumnDefToLocalStore(state);
    }

    onColumnResized(params: ColumnResizedEvent) {
        console.log("ColumnResizedEvent")
        const state = params.columnApi.getColumnState()
        this.repository.SaveColumnDefToLocalStore(state);
    }

    generatePinnedBottomData() {
        let result: any = {};
        this.gridColumnApi.getAllGridColumns().forEach(item => {
            result[item.getColId()] = null;
        });
        return this.calculatePinnedBottomData(result);
    }

    calculatePinnedBottomData(target: any) {
        let columnsWithAggregation = this.columnDefs
            .filter(i => i.aggFunc)
            .map(i => i.field as string)
        console.log(this.columnDefs)
        console.log(columnsWithAggregation);
        columnsWithAggregation.forEach(element => {
            console.log('element', element);
            this.gridApi.forEachNodeAfterFilter((rowNode) => {
                if (rowNode.data[element])
                    target[element] += Number(rowNode.data[element]);
            });
            if (target[element])
                target[element] = `<b>${formatNumber(target[element])}</b>`;
        })
        return target;
    }

    onGridReady(params: GridReadyEvent<ICostItem>) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        const localGridData = this.repository.GetColumnDefToLocalStore()
        this.repository.visaSummaryDataSubject.subscribe((item: IVisaCostSummary) => {
            this.metaData = item.MetaData;
            this.summaryData = item.SummaryData;
            this.columnDefs = ToColumnDefArr(item.CostItemColumn, item.CostItemsResult[0], localGridData);
            this.rowDataCostItem = item.CostItemsResult;
            setTimeout(() => {
                let pinnedBottomData = this.generatePinnedBottomData();
                this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
            }, 500)
        })
        this.repository.GetVisaSummary(this.year, this.brand, this.filial, this.tableVisaId)
    }

    onRowEditingStarted(event: RowEditingStartedEvent) {
    }

    onRowEditingStopped(event: RowEditingStoppedEvent) {
    }

    onCellEditingStarted(event: CellEditingStartedEvent) {
        if (event.node.group) {
            this.lastEditingSum = event.value
        }
        console.log("onCellEditingStarted");
    }

    onCellEditingStopped(event: CellEditingStoppedEvent) {
    }

    onCellValueChanged(event: CellValueChangedEvent) {
    }

    ngOnInit(): void {
    }
}
