import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locationpicker',
  templateUrl: './locationpicker.component.html',
  styleUrls: ['./locationpicker.component.css']
})
export class LocationpickerComponent implements OnInit {

  constructor() {

  //  window.location.reload(true);

   }

  ngOnInit() {
  }
  reload(){
    location.reload()
  }
local(data){
  var   num1= ((document.getElementById("onIdlePositionView") as HTMLInputElement).value);
  alert(num1)

}
}
