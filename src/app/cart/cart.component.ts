import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';

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
  constructor(private router:Router,private http:Http) {
    this.storing= window.localStorage;

    if(this.storing.getItem("order")){
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
newcaedwithitems(){
  var p=[];
  if(this.storing.getItem("order")){
    this.items=JSON.parse(this.storing.getItem("order"))

    Object.getOwnPropertyNames(this.items).forEach(key => {
      console.log(JSON.parse(this.items[key]).itemname)
    p.push({id:JSON.parse(this.items[key]).itemid,qty:JSON.parse(this.items[key]).count})


    });


}

var json={
latitude:17.3256,
longitude:78.2564,
address:"Ngos colony",
items:p,
userid:2,
username:"Raghava"


}
console.log(json)
this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/orders",json).subscribe(data => {
var boy=data.json();
console.log(boy)

})

}

}
//
