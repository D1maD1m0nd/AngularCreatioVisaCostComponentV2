import {Component, Input, OnInit} from '@angular/core';
import {ICostItem} from "../../data/model/response/ItemCost";
import {ApiClientService} from "../../services/api-client.service";
import {
    MatSnackBar,
} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {InformationDialogComponent} from "../information-dialog/information-dialog.component";
import {BridgeServiceService} from "../../services/bridge-service.service";
@Component({
    selector: 'app-saved-group-visa',
    templateUrl: './saved-group-visa.component.html',
    styleUrls: ['./saved-group-visa.component.scss']
})
export class SavedGroupVisaComponent implements OnInit {
    @Input("ICostVisaItems") ICostVisaItem: ICostItem[]
    @Input("Year") Year: string
    @Input("Brand") Brand: string

    constructor(private apiClient: ApiClientService,
                private bridgeService: BridgeServiceService,
                private _snackBar: MatSnackBar,
                public dialog: MatDialog,
                ) {
    }
    openDialog(callback: () => void): void {
        const dialogRef = this.dialog.open(InformationDialogComponent, {
            width: '350px'
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('User clicked Yes');
                callback()
            } else {
                console.log('User clicked No');
            }
        });
    }
    approveSavedData() {
        const callback = () => {
            this.apiClient.UpdateRecordsDetailBudgetSum(this.ICostVisaItem).subscribe(i => {
                console.log(i);
                this.bridgeService.IsApproveButton$.next(true);
                this.openSnackBar("Сохранение прошло успешно");
            });
        }
        const count = this.ICostVisaItem.length;
        const approveCount = this.ICostVisaItem.filter(i => i.IsAproveBrendManager);
        if(count != approveCount.length) {
            this.openDialog(callback)
        } else {
            callback();
        }

    }

    sendSavedData() {
        this.apiClient.UpdateCostVisa(this.ICostVisaItem).subscribe(i => {
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
