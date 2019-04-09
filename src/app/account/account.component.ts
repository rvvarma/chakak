import { Component, OnInit } from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
orders:any;
name:any;
email:any;
phone:any;
userid:any;

storing:any;

  constructor(private http:Http,private router: Router) {

    this.storing= window.localStorage;
this.name=this.storing.getItem("name")
this.email=this.storing.getItem("email")

this.phone=this.storing.getItem("mobile")

this.userid=this.storing.getItem("userid")

    this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/getorder-item?operation=getall&id="+this.userid).subscribe(data => {
    var boy=data.json();
    this.orders=boy.data;
    console.log(this.orders)
    var tp=[]
    for(var t=0;t<this.orders.length;t++){
this.orders[t].itemid=(JSON.parse(this.orders[t].itemid))

    }

    })
  }

logout(){

  this.storing.clear();
  this.router.navigate(['/'])
}
    ngOnInit() {
    }

  track(id){

    this.router.navigate(['/mobile/currentorder', id]);


  }


}
