import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { MobileComponent } from '../mobile/mobile.component';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('close') close1: ElementRef;
currentaddress:any;
items:any;
subtotal:any;
tax:any;
shipping:any;
hash={};
storing:any;
total:any;
isavail:any;
savedaddresses:any;
latitude:any;
longitude:any;
  constructor(private router:Router,private http:Http,private app:MobileComponent,private route: ActivatedRoute) {
    this.storing= window.localStorage;
    this.currentaddress="No Address Selected.."
if(this.route.snapshot.queryParams["address"]){
    this.currentaddress=this.route.snapshot.queryParams["address"]
    this.latitude=this.route.snapshot.queryParams["lat"]
    this.longitude=this.route.snapshot.queryParams["lng"]

}
    if(this.storing.getItem("order")){
    this.hash=new Object();
    this.isavail=true

this.items=JSON.parse(this.storing.getItem("order"))
this.subtotal=0.0;
this.tax=3.0;
this.shipping=35;
var p=[];
Object.getOwnPropertyNames(this.items).forEach(key => {
  this.hash[this.items[key].itemname]=this.items[key]
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
    this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/address-card?operation=getaddress&&userid=56").subscribe(data => {
    var boy=data.json();
    this.savedaddresses=boy.data
  })
  }

cod(){


  var p=[];
  if(this.storing.getItem("order")){
    var ptitems=JSON.parse(this.storing.getItem("order"))

    Object.getOwnPropertyNames(ptitems).forEach(key => {
      console.log(JSON.parse(ptitems[key]).itemname)
    p.push({id:JSON.parse(ptitems[key]).itemid,qty:JSON.parse(ptitems[key]).count})


    });


}
var d = new Date();
           var n = d.toLocaleString([], { hour12: true});

var json={
latitude:this.latitude,
longitude:this.longitude,
address:this.currentaddress,
item:p,
userid:2,
time:n,
username:"Raghava",
paymenttype:"cod"


}
console.log(json)
this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/orders",json).subscribe(data => {
var boy=data.json();
console.log(boy)
this.router.navigate(['/mobile/currentorder', boy.data.orderid])
this.storing.removeItem("order")
this.app.itemcount(0)

})



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
  this.app.itemcount(this.items.length)

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
  if(this.items.length==0){this.app.itemcount(Object.keys(this.hash).length)

this.isavail=false
  }
  //  console.log(this.hash.size)
}
this.storing.setItem("order",JSON.stringify(this.hash));
this.app.itemcount(this.items.length)


}
//console.log(this.hash)


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
saved(item){
  this.close1.nativeElement.click();

this.currentaddress=item.address
this.latitude=item.latitude
this.longitude=item.longitude
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
paymenttype:"COD",
username:"Raghava"


}
console.log(json)
//
this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/orders",json).subscribe(data => {
var boy=data.json();
console.log(boy)
})

}

}
//
