import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogTypeEnum} from "../../utils/constants/DialogTypeEnum";
import {FormControl} from "@angular/forms";
import {TooltipPosition} from "@angular/material/tooltip";

@Component({
    selector: 'app-information-dialog',
    templateUrl: './information-dialog.component.html',
    styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {
    DialogTypeEnum = DialogTypeEnum
    positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);

    constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(DialogTypeEnum.CLOSED_DIALOG == data.Type)
    }

    ngOnInit(): void {
    }

    onYesClick(): void {
        console.log('Yes clicked');
        this.dialogRef.close(true);
    }

    onNoClick(): void {
        console.log('No clicked');
        this.dialogRef.close(false);
    }
}
