import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public auth: AuthService, private accordion: MatAccordion) { }

  ngOnInit(): void {
  }

}
