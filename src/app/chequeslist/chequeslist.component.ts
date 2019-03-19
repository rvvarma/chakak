import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-chequeslist',
  templateUrl: './chequeslist.component.html',
  styleUrls: ['./chequeslist.component.css']
})
export class ChequeslistComponent implements OnInit {

  constructor(private router:Router,private http:Http) { }

  ngOnInit() {
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
})
}
signup(data){

var json={
  "operation": "signup",
  "email": data.value.email,
  "dob": data.value.date,
  "mobile": "+91"+data.value.mobile,
  "name":data.value.name
}
console.log(json)

  this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/signup",json).subscribe(data => {
  var boy=data.json();
console.log(boy)
})
}
}
