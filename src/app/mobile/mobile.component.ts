import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  title = 'app';
  address:any;
  @ViewChild('close') close1: ElementRef;

  constructor() {

    this.address="Locating......"
}
add(a){

  this.address=a
  console.log(a)

}
  ngOnInit() {
  }
  closemodal(){

    this.close1.nativeElement.click();
  }

}
