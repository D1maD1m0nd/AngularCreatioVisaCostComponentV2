import {Component, Input, OnInit} from '@angular/core';
import {ICostItem} from "../../data/model/response/ItemCost";
import {ApiClientService} from "../../services/api-client.service";
import {
    MatSnackBar,
} from '@angular/material/snack-bar';
@Component({
    selector: 'app-saved-group-visa',
    templateUrl: './saved-group-visa.component.html',
    styleUrls: ['./saved-group-visa.component.scss']
})
export class SavedGroupVisaComponent implements OnInit {
    @Input("ICostVisaItems") ICostVisaItem: ICostItem[]
    @Input("Year") Year: string
    @Input("Brand") Brand: string

    constructor(private apiClient: ApiClientService, private _snackBar: MatSnackBar) {
    }

    approveSavedData() {
        this.apiClient.UpdateRecordsDetailBudgetSum(this.ICostVisaItem).subscribe(i => {
            console.log(i);
            this.openSnackBar("Сохранение прошло успешно");
        });
        console.log(this.ICostVisaItem);
    }

    sendSavedData() {
        this.apiClient.UpdateCostVisa(this.ICostVisaItem).subscribe(i => {
            console.log(i);
            this.openSnackBar("Сохранение прошло успешно");
        });
        console.log(this.ICostVisaItem);
    }

    openSnackBar(message: string) {
        this._snackBar.open(message);
    }

    ngOnInit(): void {
    }

}
