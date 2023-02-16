import {Component, Input, OnInit} from '@angular/core';
import {
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    ColDef,
    DomLayoutType,
    GridApi,
    GridReadyEvent,
    RowEditingStartedEvent,
    RowEditingStoppedEvent,
} from "ag-grid-community";
import "ag-grid-enterprise"
import {ApiClientService} from "../../services/api-client.service";
import {ICostItem} from "../../data/model/response/ItemCost";
import {IVisaCostSummary} from "../../data/model/response/VisaCostSummary";
import {IGetVisaItemsResult} from "../../data/model/response/GetVisaItemsResult";
import {ToColumnDefArr} from "../../utils/mapper/ColumnMapper";
import {IMetaData} from "../../data/model/response/MetaData";
import {CheckboxRenderComponent} from "../checkbox-render-component/checkbox-render.component";
import {ISummaryData} from "../../data/model/response/SummaryData";
@Component({
    selector: 'app-angular-visa-cost',
    templateUrl: './angular-visa-cost.component.html',
    styleUrls: ['./angular-visa-cost.component.scss']
})
export class AngularVisaCostComponent implements OnInit {
    @Input('year') year: string
    @Input("brand") brand: string
    @Input("filial") filial: string
    public domLayout: DomLayoutType = 'autoHeight';
    public columnDefs: ColDef[];
    public frameworkComponents: any
    public defaultColDef: ColDef = {
        flex: 1,
        initialWidth: 300,
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
    constructor(private apiClient: ApiClientService) {
        this.frameworkComponents = {
            checkboxRenderer: CheckboxRenderComponent
        };
    }

    onGridReady(params: GridReadyEvent<ICostItem>) {
        console.log("grid ready")
        // "yearBudgetId": "42533c5f-b173-4386-a1d9-8e02e5b91d4d",
        // "brandBudgetId": "f4c9e1ef-167e-4aef-b2c1-56950486df79"
        // "filialId": "bdb405a1-6300-4e72-98b0-f49d71dd6d66"
        this.apiClient.GetVisaSummary(this.year, this.brand, this.filial).subscribe((i: IVisaCostSummary) => {
            const ItemResult: IGetVisaItemsResult = i.GetVisaItemsResult;
            this.metaData = ItemResult.MetaData;
            this.summaryData = ItemResult.SummaryData;
            this.columnDefs = ToColumnDefArr(ItemResult.CostItemColumn, ItemResult.CostItemsResult[0]);
            this.rowDataCostItem = ItemResult.CostItemsResult;
        });
    }

    onRowEditingStarted(event: RowEditingStartedEvent) {
        console.log('never called - not doing row editing');
    }

    onRowEditingStopped(event: RowEditingStoppedEvent) {
        console.log('never called - not doing row editing');
    }

    onCellEditingStarted(event: CellEditingStartedEvent) {
        console.log('cellEditingStarted');
    }

    onCellEditingStopped(event: CellEditingStoppedEvent) {
        console.log('cellEditingStopped');
        console.log(event)
    }


    ngOnInit(): void {
    }


}
