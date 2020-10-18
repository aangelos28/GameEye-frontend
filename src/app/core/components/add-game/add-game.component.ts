import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';

export interface AutocompletionResult {
    title: string;
    id: string;
}

@Component({
    selector: 'app-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit, OnDestroy {
    public searchField: FormControl;

    private subscriptions = new Subscription();

    public autocompletionSuggestions: AutocompletionResult[];
    public isLoadingSuggestions: boolean;

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.searchField = new FormControl('');

        this.subscriptions.add(this.searchField.valueChanges.pipe(
            debounceTime(300),
            tap(() => this.isLoadingSuggestions = true),
            switchMap((value) => {
                if (value.length > 2) {
                    return this.getAutocompletions(value);
                } else {
                    this.autocompletionSuggestions = [];
                }
            }),
            finalize(() => this.isLoadingSuggestions = false)
        ).subscribe((autocompletionSuggestions) => {
            this.autocompletionSuggestions = autocompletionSuggestions;
            console.log(this.autocompletionSuggestions);
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private getAutocompletions(gameTitle: string): Observable<AutocompletionResult[]> {
        const requestBody = {gameTitle};
        return this.httpClient.post<AutocompletionResult[]>('/private/game/complete', requestBody);
    }
}
