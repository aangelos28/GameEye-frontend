import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RedirectDataService {

    public data: any;

    private localStorageKey = 'redirectData';

    constructor() {
    }

    /**
     * Clears the redirect data and also from local storage
     * if any exists.
     */
    public reset(): void {
        this.data = {};
        if (this.isPersisted()) {
            localStorage.removeItem(this.localStorageKey);
        }
    }

    /**
     * Checks if there is any redirect data. Also checks local storage.
     */
    public hasData(): boolean {
        return (this.isPersisted() || this.data !== undefined);
    }

    /**
     * Checks if any persisted redirect data in local storage exists.
     */
    public isPersisted(): boolean {
        return localStorage.hasOwnProperty(this.localStorageKey);
    }

    /**
     * Saves the redirect data to local storage.
     */
    public persistToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
    }

    /**
     * Reads the redirect data from local storage.
     */
    public readFromLocalStorage(): void {
        this.data = JSON.parse(localStorage.getItem(this.localStorageKey));
    }
}
