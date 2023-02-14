import {Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
    selector: 'app-total-value-visa-footer',
    templateUrl: './total-value-visa-footer.component.html',
    styleUrls: ['./total-value-visa-footer.component.scss']
})
export class TotalValueVisaFooterComponent implements OnInit, ICellRendererAngularComp {
    public cellValue = '';
    public color = '';
    public fontWeight = '';
    public prefix = '';
    constructor() {
    }

    ngOnInit(): void {
    }

    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        this.cellValue = params.value;
        this.color = params.node.footer ? 'navy' : '';
        this.fontWeight =
            params.node.footer && params.node.level === -1 ? 'bold' : '';
        if (params.node.footer) {
            this.prefix = params.node.level === -1 ? 'Grand Total' : 'Sub Total';
        }
    }

    refresh(params: ICellRendererParams) {
        return false;
    }
}
