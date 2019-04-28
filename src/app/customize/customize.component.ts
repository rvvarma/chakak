import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
items:any;
storing:any;
lineitems:any;
hash:any;
address:any;
  constructor(private activeRoute: ActivatedRoute,private router:Router) {
    this.storing= window.localStorage;

this.hash={}
  }

  ngOnInit() {
    this.address=this.activeRoute.snapshot.params.id;
    console.log(this.address)
  this.items=JSON.parse(this.storing.getItem("custom"));
  this.hash=JSON.parse(this.storing.getItem("order"));
var data1=this.items



if(this.storing.getItem("order")!=null)
{
for(var t=0;t<data1.length;t++){
if(this.hash[data1[t].itemname]){
var p=JSON.parse(this.hash[data1[t].itemname])
//console.log(p.count)
data1[t].count=p.count


}}
}
  this.items=data1;
  }


    inc(index: number) {
    //  this.quickOrder[index].qty += 1;
//    console.log(index + " "+item)
    //this.items.item[index].count+=1
    //if(this.cookieService.get("order"))
    //this.hash=JSON.parse(this.cookieService.get("order"));
console.log(this.items[index])
    this.items[index].count+=1
    //console.log(this.items[item][index]   )
    this.hash[this.items[index].itemname]=JSON.stringify(this.items[index])
//  this.app.itemcount(Object.keys(this.hash).length)
    this.storing.setItem("order",JSON.stringify(this.hash));
    //this.router.navigate(['/customize'])

  }
  dec(index: number) {
  //  this.quickOrder[index].qty += 1;
  //console.log(this.items[item][index])
  //this.hash=JSON.parse(this.cookieService.get("order"));

  if(this.items[index].count>0){
  this.items[index].count-=1
  this.hash[this.items[index].itemname]=JSON.stringify(this.items[index])


  if(this.items[index].count==0)
  delete this.hash[this.items[index].itemname];

  this.storing.setItem("order",JSON.stringify(this.hash));
//  this.app.itemcount(Object.keys(this.hash).length)


  }
  //console.log(this.hash)


  }
  navi(){

    console.log(this.address)
    this.router.navigate(['/mobile/test'],{ queryParams: { add: this.address } })

  }
}
