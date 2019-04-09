import { Component, OnInit } from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items:any;
  storing:any;
userid:any;
  constructor(private http:Http) {

    this.storing= window.localStorage;
this.userid=this.storing.getItem("userid")
   }

  ngOnInit() {

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
userid:this.userid,
username:"Raghava"


}
console.log(json)
this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/orders",json).subscribe(data => {
var boy=data.json();
console.log(boy)

})

}
}
