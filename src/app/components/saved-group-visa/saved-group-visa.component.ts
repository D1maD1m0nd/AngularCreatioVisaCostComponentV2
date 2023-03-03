import {Component, Input, OnInit} from '@angular/core';
import {ICostItem} from "../../data/model/response/ItemCost";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {InformationDialogComponent} from "../information-dialog/information-dialog.component";
import {BridgeServiceService} from "../../services/bridge-service.service";
import {DialogTypeEnum} from "../../utils/constants/DialogTypeEnum";
import {IVisaRepository} from "../../repository/IVisaRepository";
import {VisaRepository} from "../../repository/VisaRepository";

@Component({
    selector: 'app-saved-group-visa',
    templateUrl: './saved-group-visa.component.html',
    styleUrls: ['./saved-group-visa.component.scss']
})
export class SavedGroupVisaComponent implements OnInit {
    @Input("ICostVisaItems") ICostVisaItem: ICostItem[]
    @Input("Year") Year: string
    @Input("Brand") Brand: string
    private repository: IVisaRepository
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        repository: VisaRepository,
        public bridgeService: BridgeServiceService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
    ) {
        this.repository = repository;
    }

    openDialog(type: DialogTypeEnum): void {
        const dialogRef = this.dialog.open(InformationDialogComponent, {
            width: '750px',
            data: {
                Type: type
            }
        });
        dialogRef.afterClosed().subscribe((result: DialogTypeEnum) => {
            switch (result) {
                case DialogTypeEnum.CLOSED_DIALOG:
                    break;
                case DialogTypeEnum.SAVED_DIALOG:
                    console.log('SAVED_DIALOG');
                    this.repository.SaveCostItemsToLocalStore(this.ICostVisaItem);
                    break;
                case DialogTypeEnum.SAVED_AND_SEND_DIALOG:
                case DialogTypeEnum.YES_RESULT:
                    console.log('YES_RESULT');
                    this.repository.UpdateRecordsDetailBudgetSum().subscribe(i => {
                        this.openSnackBar("Сохранение прошло успешно");
                        this.repository.ClearStorage()
                    });
                    break;
                case DialogTypeEnum.NO_RESULT:
                    break;
                default:
                    break;
            }
        });
    }

    approveSavedData() {
        const count = this.ICostVisaItem.length;
        const approveCount = this.ICostVisaItem.filter(i => i.IsAproveBrendManager);
        if (count != approveCount.length) {
            this.openDialog(DialogTypeEnum.SAVED_DIALOG)
        } else {
            this.repository.UpdateRecordsDetailBudgetSum().subscribe(i => {
                console.log(i);
                this.openSnackBar("Сохранение прошло успешно");
                this.repository.ClearStorage()
            });
        }

    }

    sendSavedData() {
        this.repository.UpdateCostVisa().subscribe(i => {
            this.openSnackBar("Сохранение прошло успешно");
            this.repository.ClearStorage()
        });
        console.log(this.ICostVisaItem);
    }

    closeWindow() {
        this.openDialog(DialogTypeEnum.CLOSED_DIALOG);
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, 'OK', {
            duration: 5000, // Закрыть через 5 секунд
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    ngOnInit(): void {
    }

}
