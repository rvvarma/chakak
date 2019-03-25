import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
declare var cordova;

@Component({
  selector: 'app-chequeslist',
  templateUrl: './chequeslist.component.html',
  styleUrls: ['./chequeslist.component.css']
})
export class ChequeslistComponent implements OnInit {
storing:any;
  constructor(private router:Router,private http:Http) {

    this.storing= window.localStorage;
 }
  show: boolean = true;
logindata:any;
error:any;
  ngOnInit() {
  /*  storage.setItem("key", "value") // Pass a key name and its value to add or update that key.

    var value = storage.getItem("key"); // Pass a key name to get its value.
    alert(value)
    storage.setItem("key", "value") // Pass a key name and its value to add or update that key.
    storage.removeItem("key")

*/



/*
var permissions = cordova.plugins.permissions;

  var list = [
    permissions.ACCESS_FINE_LOCATION
  ];

  permissions.hasPermission(list, success, error);

  function error() {
alert("Slug needs Your Locatio Permission")  }

  function success( status ) {
    if( !status.hasPermission ) {

      permissions.requestPermissions(
        list,
        function(status) {
          if( !status.hasPermission ) error();
        },
        error);
    }
  }

*/





if(this.storing.getItem("refresh")){
this.router.navigate(['/mobile'])
console.log("yesss kkk")
}
else
console.log("nooooo kkk")



  }
login(data){
  console.log(data)


/*
  var permissions = cordova.plugins.permissions;

     var list = [
       permissions.CAMERA,
       permissions.ACCESS_FINE_LOCATION
     ];

     permissions.hasPermission(list, success, error);

     function error() {
       console.warn('Camera or Accounts permission is not turned on');
     }

     function success( status ) {
       if( !status.hasPermission ) {

         permissions.requestPermissions(
           list,
           function(status) {
             if( !status.hasPermission ) error();
           },
           error);
       }
     }*/

//this.router.navigate(['/mobile'])
var json={
  "operation": "signin",
  "email": data.value.email

}
console.log(json)

  this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/signin",json).subscribe(data => {
  var boy=data.json();
if(boy.Status=="Failed"){
this.error=boy.data.message;
console.log(this.error)

}
else{
  this.show=false
  this.logindata=boy
this.error=""

}
})
}
signup(data){


var json={
  "operation": "signup",
  "email": data.value.emUSER_ID_FOR_SRPail,
  "dob": data.value.date,
  "mobile": "+91"+data.value.mobile,
  "name":data.value.nameangular
}
console.log(json)

  this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/signup",json).subscribe(data => {
  var boy=data.json();
console.log(boy)
})
}
changetologin(){
  this.show=true
}
gettoken(data){
  //console.log("checking "+this.logindata)
var json={

  "operation": "challenge_mfa",
  "username": this.logindata.ChallengeParameters.USER_ID_FOR_SRP,
  "mfa_code": data.value.otp,
  "session":this.logindata.Session

}
//console.log(json)

  this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/challenge-mfa",json).subscribe(data => {
  var boy=data.json();
console.log(boy)
if(boy.Status=="Success"){

this.storing.setItem("refresh",boy.data.AuthenticationResult.RefreshToken)
this.storing.setItem("access",boy.data.AuthenticationResult.AccessToken)

this.router.navigate(['/mobile'])
}
else{

this.error=boy.errorMessage

}
})


}
}
