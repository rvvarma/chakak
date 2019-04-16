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


//this.datarefresh("unnaned",this)



}/*
var onResume=function() {
alert("hii")
}
document.addEventListener("resume", onResume, false);


*/
  ngOnInit() {
this.items=JSON.parse(this.storing.getItem("itemdata"))
this.savedaddresses=JSON.parse(this.storing.getItem("adding"))
console.log(this.savedaddresses)

//console.log(this.app.getitems())

  }



saved(data){
this.items=data

console.log(this.items)

}

savedata(data){
  console.log(data.latitude)
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

}
