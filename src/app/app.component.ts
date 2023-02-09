import {Component, Input} from '@angular/core';

@Component({
    selector: 'vlt-visa-cost',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class VltVisaCostComponent {
    @Input() year: string
    @Input() brand: string
}
