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

    constructor(private apiClient: ApiClientService) {
    }

    sendSavedData() {
        console.log(this.ICostVisaItem);
    }

    cancelSavedData() {

    }

    ngOnInit(): void {
    }

}
