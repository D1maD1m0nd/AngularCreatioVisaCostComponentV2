import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    constructor(@Inject('LOCAL_STORAGE') private localStorage: Storage) {}

    setItem(key: string, value: any): void {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        const value = this.localStorage.getItem(key);
        if(value) {
            return JSON.parse(value);
        }
        return;
    }

    removeItem(key: string): void {
        this.localStorage.removeItem(key);
    }

    clear(): void {
        this.localStorage.clear();
    }
}
