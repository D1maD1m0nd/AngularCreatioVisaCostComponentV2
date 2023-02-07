import { Component, OnInit } from '@angular/core';
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
export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
@Component({
  selector: 'app-angular-visa-cost',
  templateUrl: './angular-visa-cost.component.html',
  styleUrls: ['./angular-visa-cost.component.scss']
})
export class AngularVisaCostComponent implements OnInit {

  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [

    { field: 'country', rowGroup: true, hide: true, enableRowGroup: true, filter: 'agSetColumnFilter'},
    { field: 'year', rowGroup: true, hide: true, enableRowGroup: true, filter: 'agSetColumnFilter',  },
    { field: 'gold', aggFunc: 'sum', headerName: 'Золото',filter: 'agSetColumnFilter', },
    { field: 'silver', aggFunc: 'max', headerName: 'Серебро', filter: 'agSetColumnFilter',},
    { field: 'bronze', aggFunc: 'avg', headerName: 'Бронза', filter: 'agSetColumnFilter',},
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
    editable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public rowData!: IOlympicData[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => {
        this.rowData = data
        console.log(data)
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
