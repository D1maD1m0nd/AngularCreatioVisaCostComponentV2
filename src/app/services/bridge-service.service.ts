import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BridgeServiceService {
    IsApproveButton$ = new Subject<boolean>()

    constructor() {
    }
}
