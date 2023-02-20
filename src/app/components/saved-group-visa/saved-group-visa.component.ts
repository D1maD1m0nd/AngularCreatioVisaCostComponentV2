import {Component, Input, OnInit} from '@angular/core';
import {ICostItem} from "../../data/model/response/ItemCost";
import {ApiClientService} from "../../services/api-client.service";
import {
    MatSnackBar,
} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {InformationDialogComponent} from "../information-dialog/information-dialog.component";
@Component({
    selector: 'app-saved-group-visa',
    templateUrl: './saved-group-visa.component.html',
    styleUrls: ['./saved-group-visa.component.scss']
})
export class SavedGroupVisaComponent implements OnInit {
    @Input("ICostVisaItems") ICostVisaItem: ICostItem[]
    @Input("Year") Year: string
    @Input("Brand") Brand: string

    constructor(private apiClient: ApiClientService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(InformationDialogComponent, {
            width: '350px'
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('User clicked Yes');
            } else {
                console.log('User clicked No');
            }
        });
    }
    approveSavedData() {
        this.apiClient.UpdateRecordsDetailBudgetSum(this.ICostVisaItem).subscribe(i => {
            console.log(i);
            this.openDialog()
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
        this._snackBar.open(message, 'OK', {
            duration: 5000 // Закрыть через 5 секунд
        });
    }

    ngOnInit(): void {
    }

}
