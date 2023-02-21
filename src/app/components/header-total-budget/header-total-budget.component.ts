import {Component, Input, OnInit} from '@angular/core';
import {ISummaryData} from "../../data/model/response/SummaryData";

@Component({
    selector: 'app-header-total-budget',
    templateUrl: './header-total-budget.component.html',
    styleUrls: ['./header-total-budget.component.scss']
})
export class HeaderTotalBudgetComponent implements OnInit {
    @Input("summary-data") summaryData: ISummaryData

    constructor() {
    }

    ngOnInit(): void {
    }

}
