import {Component, Input, OnInit} from '@angular/core';
import {ICostItem} from "../../data/model/response/ItemCost";
import {ISummaryData} from "../../data/model/response/SummaryData";

@Component({
    selector: 'app-header-container',
    templateUrl: './header-container.component.html',
    styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {
    @Input("ICostVisaItems") ICostVisaItems: ICostItem[]
    @Input("Year") Year: string
    @Input("Brand") Brand: string
    @Input("summary-data") SummaryData : ISummaryData
    constructor() {
    }

    ngOnInit(): void {
    }

}
