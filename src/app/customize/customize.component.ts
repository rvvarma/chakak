import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
indi:any;
storing:any;
  constructor() {
this.indi={}
  }

  ngOnInit() {
    this.storing= window.localStorage;
  //  console.log(this.storing.getItem("itemdata"))
  }

}
