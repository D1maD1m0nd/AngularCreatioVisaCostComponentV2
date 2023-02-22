import {Component, Input, OnInit} from '@angular/core';
import {
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    CellValueChangedEvent,
    ColDef,
    DomLayoutType,
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

@Component({
    selector: 'app-angular-visa-cost',
    templateUrl: './angular-visa-cost.component.html',
    styleUrls: ['./angular-visa-cost.component.scss']
})
export class AngularVisaCostComponent implements OnInit {
    repository: IVisaRepository
    @Input('year') year: string
    @Input("brand") brand: string
    @Input("filial") filial: string
    @Input("table-visa-id") tableVisaId: string
    public domLayout: DomLayoutType = 'autoHeight';
    public columnDefs: ColDef[];
    public frameworkComponents: any
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

    constructor(repository: VisaRepository,
                private bridgeService: BridgeServiceService) {
        this.frameworkComponents = {
            checkboxRenderer: CheckboxRenderComponent
        };
        this.repository = repository;
        bridgeService.IsApproveButton$.subscribe(i => {
        });
    }

    onGridReady(params: GridReadyEvent<ICostItem>) {
        console.log("grid ready")
        this.repository
            .GetVisaSummary(this.year, this.brand, this.filial, this.tableVisaId)
            .subscribe((item: IVisaCostSummary) => {
                this.metaData = item.MetaData;
                this.summaryData = item.SummaryData;
                this.columnDefs = ToColumnDefArr(item.CostItemColumn, item.CostItemsResult[0]);
                this.rowDataCostItem = item.CostItemsResult;
            });
    }

    onRowEditingStarted(event: RowEditingStartedEvent) {

    }

    onRowEditingStopped(event: RowEditingStoppedEvent) {

    }

    onCellEditingStarted(event: CellEditingStartedEvent) {

    }

    onCellEditingStopped(event: CellEditingStoppedEvent) {

    }

    onCellValueChanged(event: CellValueChangedEvent) {
        this.repository.AddUpdateItem(event.data);
    }

    ngOnInit(): void {

    }

}
