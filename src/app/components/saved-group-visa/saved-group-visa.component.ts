import {Component, Input, OnInit} from '@angular/core';
import {ICostItem} from "../../data/model/response/ItemCost";
import {ApiClientService} from "../../services/api-client.service";

@Component({
    selector: 'app-saved-group-visa',
    templateUrl: './saved-group-visa.component.html',
    styleUrls: ['./saved-group-visa.component.scss']
})
export class SavedGroupVisaComponent implements OnInit {
    @Input("ICostVisaItems") ICostVisaItem: ICostItem[]
    @Input("Year") Year: string
    @Input("Brand") Brand: string

    constructor(private apiClient: ApiClientService) {
    }

    sendSavedData() {
        this.apiClient.UpdateCostVisa(this.ICostVisaItem);
        console.log(this.ICostVisaItem);
    }

    cancelSavedData() {
        this.apiClient.GetVisaSummary(this.Year, this.Brand);
    }

    ngOnInit(): void {
    }

}
