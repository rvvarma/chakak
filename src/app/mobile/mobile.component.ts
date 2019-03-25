import { Component, OnInit,ViewChild ,ElementRef,Inject} from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { TestComponent } from '../test/test.component';
declare var cordova;
//declare var firebase;
//declare var window;
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  title = 'app';
  address:any;
  savedaddresses:any;
  private test : TestComponent;
  storing:any;

  @ViewChild('close') close1: ElementRef;


  constructor(private http:Http,private router:Router) {
    this.storing= window.localStorage;




//
/*
firebase.getToken(function(token) {
    // save this server-side and use it to push notifications to this device
    alert(token);
}, function(error) {
    alert(error);
});*/



    this.address="Locating......"
}
add(a){
//
  this.address=a
  console.log(a)

}
  ngOnInit() {
//this.swing()
    //this.router.navigate(['/mobile'])



    var json={
      "operation": "refresh_token",
      "refresh_token": this.storing.getItem("refresh")

    }
    console.log(json)
    this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/address-card?operation=getaddress&&userid=56").subscribe(data => {
    var boy=data.json();
    this.savedaddresses=boy.data
  })
    /*  this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/refreshtoken",json).subscribe(data => {
      var boy=data.json();
    if(boy.Status="Success"){
      this.cookieService.put("access",boy.data.AuthenticationResult.AccessToken)


    }
    else{
    this.router.navigate(['/'])
  }

})*/
  }


  saved(data){
    //this.router.navigate(['/mobile/location'],{ queryParams: { lat: data.latitude, lng: data.longitude } })
  let saro = new TestComponent(data,this,data);
saro.swing(data.latitude,data.longitude,this,saro);
  //  this.router.navigate(['/mobile/'],{ queryParams: { lat: data.latitude, lng: data.longitude } })
//  this.
this.closemodal()

  }
  closemodal(){
    //cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to works.",//message
                        "Use GPS, with wifi or 3G.",//description
                        function(buttonIndex){//callback
if(buttonIndex==2){
  this.router.navigate(['/mobile/location'])
}
if(buttonIndex==0){

  alert("Need Location Access")
}

              }
                          );
    this.close1.nativeElement.click();
  }

}
