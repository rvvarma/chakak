import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-chequeslist',
  templateUrl: './chequeslist.component.html',
  styleUrls: ['./chequeslist.component.css']
})
export class ChequeslistComponent implements OnInit {

  constructor(private router:Router,private http:Http,private cookieService:CookieService) { }
  show: boolean = true;
logindata:any;
  ngOnInit() {

if(this.cookieService.get("refresh")
this.router.navigate(['/mobile'])



  }
login(data){
  console.log(data)
//this.router.navigate(['/mobile'])
var json={
  "operation": "signin",
  "email": data.value.email

}
console.log(json)

  this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/signin",json).subscribe(data => {
  var boy=data.json();
console.log(boy)
this.show=false
this.logindata=boy
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
this.cookieService.put("access",boy.data.AuthenticationResult.AccessToken)
this.cookieService.put("refresh",boy.data.AuthenticationResult.RefreshToken)

})



}
}
