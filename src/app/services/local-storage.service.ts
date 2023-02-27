import {Inject, Injectable} from '@angular/core';
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(@Inject('LOCAL_STORAGE') private localStorage: Storage) {
    }

    setItem(key: string, value: any): void {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string | null): IVisaCostSummary | null {
        if (typeof key === "string") {
            const value = this.localStorage.getItem(key);
            if (value) {
                const data = JSON.parse(value);
                if (data.SaveLocal) {
                    return data;
                }
            }
        }
        return null;
    }

    removeItem(key: string): void {
        this.localStorage.removeItem(key);
    }

    clear(): void {
        this.localStorage.clear();
    }
}
