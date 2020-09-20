import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RedirectDataService {

    public data: any;

    constructor() {
    }

    reset(): void {
        this.data = {};
    }
}
