import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
    selector: 'app-checkbox-render-component',
    templateUrl: './checkbox-render.component.html',
    styleUrls: ['./checkbox-render.component.scss']
})
export class CheckboxRenderComponent implements OnInit, ICellRendererAngularComp, OnDestroy {
    public params: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams<any>): boolean {
        return false;
    }

    checkedHandler(event: any) {
        let checked = event.target.checked;
        let colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
    }

    ngOnDestroy(): void {
    }
}
