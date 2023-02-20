import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
    selector: 'app-information-dialog',
    templateUrl: './information-dialog.component.html',
    styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<InformationDialogComponent>) {
    }

    ngOnInit(): void {
    }

}
