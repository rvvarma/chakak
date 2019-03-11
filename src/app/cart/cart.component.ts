import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
items:any;
subtotal:any;
tax:any;
shipping:any;
total:any;
  constructor(private cookieService:CookieService) {
this.items=JSON.parse(this.cookieService.get("order"))
this.subtotal=0.0;
this.tax=3.0;
this.shipping=35;
var p=[];
Object.getOwnPropertyNames(this.items).forEach(key => {
  console.log(this.items[key])
  this.subtotal+=JSON.parse(this.items[key]).itemprice;
p.push(JSON.parse(this.items[key]))


});
this.items=p;
this.total=this.subtotal+this.tax+this.shipping;

console.log(this.items)


  }

  ngOnInit() {
  }

}
