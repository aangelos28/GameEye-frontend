import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-img-titlebar',
  templateUrl: './img-titlebar.component.html',
  styleUrls: ['./img-titlebar.component.scss']
})
export class ImgTitlebarComponent implements OnInit {

    @Input() titletext: string;
    @Input() imageUrl: string;
  constructor() { }

  ngOnInit(): void {
  }

}
