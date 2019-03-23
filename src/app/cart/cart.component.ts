import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

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
hash={};
storing:any;
total:any;
isavail:any;
  constructor(private cookieService:CookieService,private router:Router) {
    this.storing= window.localStorage;

    if(this.storing.setItem("order")){
    this.hash=new Object();
    this.isavail=true
this.items=JSON.parse(this.storing.getItem("order"))
this.subtotal=0.0;
this.tax=3.0;
this.shipping=35;
var p=[];
Object.getOwnPropertyNames(this.items).forEach(key => {
  console.log(this.items[key].itemprice)
  this.subtotal+=JSON.parse(this.items[key]).itemprice*JSON.parse(this.items[key]).count;
p.push(JSON.parse(this.items[key]))


});
this.items=p;
this.total=this.subtotal+this.tax+this.shipping;

if(this.items.length==0){
  this.isavail=false
}
else
this.isavail=true
}
else{
this.isavail=false
        //    this.router.navigate(['/mobile']);

}

  }

  ngOnInit() {
  }


  inc(index: number) {
  //  this.quickOrder[index].qty += 1;
  //console.log(index + " "+item)
  //this.items.item[index].count+=1
  //if(this.cookieService.get("order"))
  //this.hash=JSON.parse(this.cookieService.get("order"));
  this.total-=this.subtotal;

this.subtotal+=this.items[index].itemprice;
this.total=this.total+this.subtotal

  this.items[index].count+=1
  //console.log(this.items[item][index]   )
  this.hash[this.items[index].itemname]=JSON.stringify(this.items[index])
  console.log(this.hash)
  this.storing.setItem("order",JSON.stringify(this.hash));

}
dec(index: number) {
//  this.quickOrder[index].qty += 1;
//console.log(this.items[item][index])
//this.hash=JSON.parse(this.cookieService.get("order"));

if(this.items[index].count>0){
this.items[index].count-=1
this.hash[this.items[index].itemname]=JSON.stringify(this.items[index])

this.total-=this.subtotal;
this.subtotal-=this.items[index].itemprice
this.total=this.total+this.subtotal
if(this.items[index].count==0){
delete this.hash[this.items[index].itemname];



    this.items.splice(index, 1);
  if(this.items.length==0){
this.isavail=false
  }
  //  console.log(this.hash.size)
}
this.storing.setItem("order",JSON.stringify(this.hash));


}
//console.log(this.hash)


}

}
//
