import {Component, Input, OnInit} from '@angular/core';
import {
  CellEditingStartedEvent, CellEditingStoppedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  RowEditingStartedEvent,
  RowEditingStoppedEvent
} from "ag-grid-community";
import {HttpClient} from "@angular/common/http";
import "ag-grid-enterprise"
import {ApiClientService} from "../../services/api-client.service";
import {ICostItem} from "../../data/model/response/ItemCost";
import {IVisaCostSummary} from "../../data/model/response/VisaCostSummary";
import {IGetVisaItemsResult} from "../../data/model/response/GetVisaItemsResult";
import {ToColumnDefArr} from "../../utils/mapper/ColumnMapper";

@Component({
  selector: 'app-angular-visa-cost',
  templateUrl: './angular-visa-cost.component.html',
  styleUrls: ['./angular-visa-cost.component.scss']
})
export class AngularVisaCostComponent implements OnInit {

  private gridApi!: GridApi;
  public columnDefs: ColDef[];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public rowSelection: 'single' | 'multiple' = 'single';
  @Input('year') year: string
  @Input("brand") brand: string
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public rowDataCostItem!: ICostItem[];
  constructor(private apiClient: ApiClientService) {}

  onGridReady(params: GridReadyEvent<ICostItem>) {
    console.log("grid ready")
    // "yearBudgetId": "42533c5f-b173-4386-a1d9-8e02e5b91d4d",
    //     "brandBudgetId": "f4c9e1ef-167e-4aef-b2c1-56950486df79"
    this.apiClient.GetVisaSummary(this.year, this.brand).subscribe((i: IVisaCostSummary) => {
      const ItemResult : IGetVisaItemsResult = i.GetVisaItemsResult;
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
  }
  ngOnInit(): void {
  }


}
