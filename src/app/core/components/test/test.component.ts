import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {share} from 'rxjs/operators';
import {AuthService} from '../../../authentication/services/auth/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    public companies$: Observable<any>;

    constructor(public auth: AuthService, private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.companies$ = this.httpClient.get(environment.backendUrl + '/private/companies').pipe(share());
    }
}
