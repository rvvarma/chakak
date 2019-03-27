import { Component, OnInit } from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { MobileComponent } from '../mobile/mobile.component';
import { ActivatedRoute } from "@angular/router";
import { CheckoutComponent } from '../checkout/checkout.component';

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

  constructor(private http:Http,private app:MobileComponent,private route: ActivatedRoute) {
  //  this.hash=new Object()
//  this.cookieService.removeAll();
this.storing= window.localStorage;

//let app = new AppComponent();
this.hash={};










  }

  ngOnInit() {

    console.log("intiated man")
    if (window.navigator && window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
              position => {
              //    this.geolocationPosition = position,
                      console.log(position)
                      let lat = this.route.snapshot.queryParams["lat"];
                      let lng = this.route.snapshot.queryParams["lng"];
                      console.log(lat)
                      console.log(lng)
if(lat==null&&lng==null){
lat=position.coords.latitude
  lng=position.coords.longitude
}
                      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyD1Sycc5CNd8Y42QfsRTF5b5sooYFhaZEU").subscribe(data => {
                      var boy=data.json();
                      console.log(boy)
                      console.log(boy.results[3].address_components[6].long_name)
                      this.app.add(boy.results[3].address_components[0].long_name)
                      this.datarefresh(boy.results[3].address_components[6].long_name,this)
                      })


              },
              error => {
                  switch (error.code) {
                      case 1:
                          console.log('Permission Denied');
                          break;
                      case 2:
                          console.log('Position Unavailable');
                          break;
                      case 3:
                          console.log('Timeout');
                          break;
                  }
              }
          );
      }
  }

swing(lat,lng,that,saro){


  console.log("emundi"+lat)



                      that.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyD1Sycc5CNd8Y42QfsRTF5b5sooYFhaZEU").subscribe(data => {
                      var boy=data.json();
                      console.log(boy)
                      console.log(boy.results[3].address_components[6].long_name)
                      that.add(boy.results[3].address_components[0].long_name)
                      this.datarefresh(boy.results[3].address_components[6].long_name,that)
                    })

}

datarefresh(data,mobdata){

var _this=mobdata
      _this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/items?operation=get&pincode=500070").subscribe(data => {
    var boy=data.json();
  //console.log(boy)
  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  var groubedByTeam=groupBy(boy.data, 'itemcategory')
  console.log(groubedByTeam)
  var data1=groubedByTeam
  _this.items=data1
  //this.hash=this.cookieService.get("order")
  if(_this.storing.getItem("order"))
  {
    _this.hash=JSON.parse(_this.storing.getItem("order"))
    var data2=JSON.parse(_this.storing.getItem("order"))

  console.log(data2)
  var m=new Object();
  m=data2;
var tpp=0;
  //console.log(m["Banana MilkShake"])
  //
    Object.getOwnPropertyNames(_this.items).forEach(key => {
    for(var t=0;t<_this.items[key].length;t++){
  if(m[_this.items[key][t].itemname]){
    var p=JSON.parse(m[_this.items[key][t].itemname])
    console.log(p.count)
  _this.items[key][t].count=p.count
tpp++;

  }
    }
    });

    _this.app.itemcount(tpp)



  }
  //console.log(this.hash)


    });

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
  this.storing.setItem("order",JSON.stringify(this.hash));
this.app.itemcount(Object.keys(this.hash).length)
)

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
callback(position) {
console.log(position.coords.latitude);
console.log(position.coords.longitude)
// document.getElementById('longitude').innerHTML = position.coords.longitude;
}
}
