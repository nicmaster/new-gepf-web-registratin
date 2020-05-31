import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit{
  name = 'G.P.A.A Funeral Benefits Service';
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {

  }
}
