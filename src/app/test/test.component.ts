import { Component, OnInit } from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { MobileComponent } from '../mobile/mobile.component';
import { ActivatedRoute } from "@angular/router";
import { CheckoutComponent } from '../checkout/checkout.component';
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

  constructor(private http:Http,private app:MobileComponent,private route: ActivatedRoute) {
  //  this.hash=new Object()
//  this.cookieService.removeAll();
this.storing= window.localStorage;

//let app = new AppComponent();
this.hash={};

this.app.itemcount(0)




//this.datarefresh("unnaned",this)



}/*
var onResume=function() {
alert("hii")
}
document.addEventListener("resume", onResume, false);


*/
  ngOnInit() {

    document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            if(cordova.dialogGPS()){
              alert("yes")
            }

        }
   var onResume=function() {
cordova.dialogGPS()    //cordova.dialogGPS();
    }
    document.addEventListener("resume", onResume, false);

//
var that=this
      console.log("navigator.geolocation works well");
      var onSuccess = function(position) {

                let lat = that.route.snapshot.queryParams["lat"];
                let lng = that.route.snapshot.queryParams["lng"];
                console.log(lat)
                console.log(lng)
if(lat==null&&lng==null){
lat=position.coords.latitude
lng=position.coords.longitude
}
                that.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyD1Sycc5CNd8Y42QfsRTF5b5sooYFhaZEU").subscribe(data => {
                var boy=data.json();
                console.log(boy)
                console.log(boy.results[3].address_components[6].long_name)
                that.app.add(boy.results[3].address_components[0].long_name)
                that.datarefresh(boy.results[3].address_components[6].long_name,that)
                })

      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);

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

var than=mobdata
      than.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/items?operation=get&pincode=500070").subscribe(data => {
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
  than.items=data1
  //this.hash=this.cookieService.get("order")
  if(than.storing.getItem("order"))
  {
    than.hash=JSON.parse(than.storing.getItem("order"))
    var data2=JSON.parse(than.storing.getItem("order"))

  console.log(data2)
  var m=new Object();
  m=data2;

  //console.log(m["Banana MilkShake"])
  //
    Object.getOwnPropertyNames(than.items).forEach(key => {
    for(var t=0;t<than.items[key].length;t++){
  if(m[than.items[key][t].itemname]){
    var p=JSON.parse(m[than.items[key][t].itemname])
    console.log(p.count)
  than.items[key][t].count=p.count


  }
    }
    });

    than.app.itemcount(Object.keys(this.hash).length)





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
