import { Component, OnInit ,ChangeDetectorRef,ElementRef,ViewChild} from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { MobileComponent } from '../mobile/mobile.component';
import { ActivatedRoute } from "@angular/router";
import { CheckoutComponent } from '../checkout/checkout.component';
import {Router} from "@angular/router"

declare var cordova;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']

})
export class TestComponent implements OnInit {
items:any;
hash:any;
address:any;
storing:any;
savedaddresses:any;
userid:any;
@ViewChild('close') close1: ElementRef;

  constructor(private http:Http,private app:MobileComponent,private route: ActivatedRoute,private router: Router) {
  //  this.hash=new Object()
//  this.cookieService.removeAll();
this.storing= window.localStorage;
this.userid=this.storing.getItem("userid")
//let app = new AppComponent();
this.hash={};

//this.app.itemcount(0)

this.items=[]
if(this.route.snapshot.queryParams.add){
this.app.add(this.route.snapshot.queryParams.add)

}
this.app.itemcount(Object.keys(JSON.parse(this.storing.getItem("order"))).length)
console.log(JSON.parse(this.storing.getItem("order")))

//this.datarefresh("unnaned",this)



}/*
var onResume=function() {
alert("hii")
}
document.addEventListener("resume", onResume, false);


*/
  ngOnInit() {
  /*  var onResume=function() {
this.router.navigate(['/mobile'])
}*/
  //   document.addEventListener("resume", onResume, false);
  //   console.log(this.storing.getItem("itemdata") +" "+this.userid)
this.items=JSON.parse(this.storing.getItem("itemdata"))
console.log(this.items)
this.savedaddresses=JSON.parse(this.storing.getItem("adding"))
console.log(this.storing.getItem("order"))
var data1=this.items
var m=new Object();
m=JSON.parse(this.storing.getItem("order"))
if(this.storing.getItem("order")!=null)
{
Object.getOwnPropertyNames(data1).forEach(key => {
for(var t=0;t<data1[key].length;t++){
if(m[data1[key][t].itemname]){
var p=JSON.parse(m[data1[key][t].itemname])
//console.log(p.count)
data1[key][t].count=p.count


}}})
}

this.hash=JSON.parse(this.storing.getItem("order"))
this.items=data1
//console.log(this.app.getitems())

  }





saved(data){
this.items=data

//console.log(this.items)

}

savedata(data){
//  console.log(data.latitude)
  this.router.navigate(['/mobile/'],{ queryParams: { lat: data.latitude, lng: data.longitude} })
  this.close1.nativeElement.click();

}


  inc(index: number,item:any) {
  //  this.quickOrder[index].qty += 1;
  //console.log(index + " "+item)
  //this.items.item[index].count+=1
  //if(this.cookieService.get("order"))
  //this.hash=JSON.parse(this.cookieService.get("order"));

  this.items[item][index].count+=1
  //console.log(this.items[item][index]   )
  this.hash[this.items[item][index].itemname]=JSON.stringify(this.items[item][index])
this.app.itemcount(Object.keys(this.hash).length)
  this.storing.setItem("order",JSON.stringify(this.hash));
  //this.router.navigate(['/customize'])

}
dec(index: number,item:any) {
//  this.quickOrder[index].qty += 1;
//console.log(this.items[item][index])
//this.hash=JSON.parse(this.cookieService.get("order"));

if(this.items[item][index].count>0){
this.items[item][index].count-=1
this.hash[this.items[item][index].itemname]=JSON.stringify(this.items[item][index])


if(this.items[item][index].count==0)
delete this.hash[this.items[item][index].itemname];

this.storing.setItem("order",JSON.stringify(this.hash));
this.app.itemcount(Object.keys(this.hash).length)


}
//console.log(this.hash)


}
custom(data){
  console.log(this.app.address)

  this.storing.setItem("custom",JSON.stringify(data));
  this.router.navigate(['/customize',this.app.address])
//
}

}
