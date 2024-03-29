import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {BridgeServiceService} from "../../services/bridge-service.service";

@Component({
    selector: 'app-checkbox-render-component',
    templateUrl: './checkbox-render.component.html',
    styleUrls: ['./checkbox-render.component.scss']
})
export class CheckboxRenderComponent implements OnInit, ICellRendererAngularComp, OnDestroy {
    editingColumnKey = "IsAproveBrendManager"
    public params: any;
    public isEdit: boolean = false

    constructor(private bridgeServiceService: BridgeServiceService) {
    }

    public set isEditSet(value: boolean) {
        const key = this.params.colDef.field;
        if (key == this.editingColumnKey && !this.isEdit) {
            this.isEdit = value;
        }
    }

    ngOnInit(): void {
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.isEditSet = params.value
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }

    checkedHandler(event: any) {
        let checked = event.checked;
        let colId = this.params.column.colId;
        this.isEditSet = checked
        if (this.params.node.childrenAfterSort) {
            this.params.node.childrenAfterSort.forEach((i: any) => {
                i.setDataValue(colId, checked);
            });
        }
        this.params.node.setDataValue(colId, checked);
    }

    ngOnDestroy(): void {
    }
}
