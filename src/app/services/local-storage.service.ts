import {Inject, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(@Inject('LOCAL_STORAGE') private localStorage: Storage) {
    }

    setItem(key: string, value: any): void {
        const data = JSON.stringify(value)
        this.localStorage.setItem(key, data);
    }

    getItem(key: string | null): any | null {
        if (typeof key === "string") {
            const value = this.localStorage.getItem(key);
            if (value) {
                const data = JSON.parse(value);
                //TODO Вернуть
                // if (data.SaveLocal) {
                return data;
                // }
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
