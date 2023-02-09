import {Component, Input, OnInit} from '@angular/core';
import {IMetaData} from 'src/app/data/model/response/MetaData';

@Component({
    selector: 'app-header-group-visa',
    templateUrl: './header-group-visa.component.html',
    styleUrls: ['./header-group-visa.component.scss']
})
export class HeaderGroupVisaComponent implements OnInit {

    @Input() metaData: IMetaData

    ngOnInit(): void {
    }

}
