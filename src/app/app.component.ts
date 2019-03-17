import { Component } from '@angular/core';
declare var cordova;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
address:any;
constructor(){
//  alert("hii")
this.address="Locating......"
//this.add()
//
}
  add(a){

    this.address=a
    console.log(a)

  }
}
