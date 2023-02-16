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
        console.log(event)
        let checked = event.checked;
        let colId = this.params.column.colId;
        console.log(this.params)
        if(this.params.node.childrenAfterSort.length > 0) {
            this.params.node.childrenAfterSort.forEach((i : any) => {
                i.setDataValue(colId, checked);
            });
        }
        console.log(this.params.node.childrenAfterSort[0].setDataValue(colId, checked));
        this.params.node.setDataValue(colId, checked);
    }

    ngOnDestroy(): void {
    }
}
