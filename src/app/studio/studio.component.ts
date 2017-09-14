import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.less']
})
export class StudioComponent implements OnInit {

  routerOutletWrapperId: string;
  routerOutletWrapperClass: string;

  constructor() {
    this.routerOutletWrapperId = 'studio-page-body';
    this.routerOutletWrapperClass = '';
  }

  ngOnInit() {
  }

}
