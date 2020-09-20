import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RedirectDataService {

    public data: any;

    private localStorageKey = 'redirectData';

    constructor() {
    }

    public reset(): void {
        this.data = {};
        if (this.isPersisted()) {
            localStorage.removeItem(this.localStorageKey);
        }
    }

    public isPersisted(): boolean {
        return localStorage.hasOwnProperty(this.localStorageKey);
    }

    public persistToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
    }

    public readFromLocalStorage(): void {
        this.data = JSON.parse(localStorage.getItem(this.localStorageKey));
    }
}
