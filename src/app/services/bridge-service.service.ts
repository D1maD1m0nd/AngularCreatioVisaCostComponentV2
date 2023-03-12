import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BridgeServiceService {
    IsApproveButtonDisabled$ = new BehaviorSubject<boolean>(false)
    IsSaveButtonDisabled$ = new BehaviorSubject<boolean>(false)
    IsCloseButtonDisabled$ = new BehaviorSubject<boolean>(false)
    OnCloseButtonClick$ = new BehaviorSubject<boolean>(false)

    constructor() {
    }
}
