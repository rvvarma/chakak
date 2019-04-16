import { Component, OnInit,ViewChild ,ElementRef,Inject} from '@angular/core';
import { forwardRef } from '@angular/core';

import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { TestComponent } from '../test/test.component';
declare var cordova;
declare var firebase;
//declare var window;
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']


})
export class MobileComponent implements OnInit {
  title = 'app';
  address:any;
  savedaddresses:any;
  private test : TestComponent;mobdata
  storing:any;
  itemcounts:any;
  userid:any;

  @ViewChild('close') close1: ElementRef;


  constructor(private http:Http,private router:Router,private route: ActivatedRoute) {
    this.storing= window.localStorage;
this.userid=this.storing.getItem("userid")
this.storing.setItem("itemdata","")

this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/address-card?operation=getaddress&&userid="+this.userid).subscribe(data => {
var boy=data.json();
this.savedaddresses=boy.data
console.log(boy.data)
console.log(this.savedaddresses)

})
//
/*
firebase.getToken(function(token) {
    // save this server-side and use it to push notifications to this device
    console.log("firetaking "+token);
}, function(error) {
    console.log(error);
});*/



    this.address="Locating......"
}
ngAfterViewInit() {

  }
add(a){
//
  this.address=a
  console.log(a)

}
itemcount(count){

this.itemcounts=count
console.log(count)

}
  ngOnInit() {
//this.swing()
    //this.router.navigate(['/mobile'])


    var json={
      "operation": "refresh_token",
      "refresh_token": this.storing.getItem("refresh")

    }
    console.log(json)




//testing to fix location problem

    document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            if(cordova.dialogGPS()){
          //    alert("yes")
            }

        }
   var onResume=function() {
cordova.dialogGPS()    //cordova.dialogGPS();
    }
    document.addEventListener("resume", onResume, false);

//
var that=this
      console.log("navigator.geolocation works well");







  }


  closemodal(){
    //cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to works.",//message
                      /*  "Use GPS, with wifi or 3G.",//description
                        function(buttonIndex){//callback
if(buttonIndex==2){
  this.router.navigate(['/mobile/location'])
}
if(buttonIndex==0){

  alert("Need Location Access")
}

              }
            );*/
    this.close1.nativeElement.click();
  }













}
