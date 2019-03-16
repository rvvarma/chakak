import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  title = 'app';
  address:any;
  constructor() {

    this.address="Locating......"
}
add(a){

  this.address=a
  console.log(a)

}
  ngOnInit() {
  }

}
