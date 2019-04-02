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
  constructor(private http:Http,private router: Router) {



    this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/getorder-item?operation=getall&id=56").subscribe(data => {
    var boy=data.json();
    this.orders=boy.data;
    console.log(this.orders)
    var tp=[]
    for(var t=0;t<this.orders.length;t++){
this.orders[t].itemid=(JSON.parse(this.orders[t].itemid))

    }

    })
  }


    ngOnInit() {
    }

  track(id){

    this.router.navigate(['/mobile/currentorder', id]);


  }


}
