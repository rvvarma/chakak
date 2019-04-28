import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { MobileComponent } from '../mobile/mobile.component';
import { TestComponent } from '../test/test.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {
storing:any;
userid:any;
savedaddresses:any;
hash:any;
@ViewChild('close') close1: ElementRef;

  constructor(private app:MobileComponent,private http:Http,private router:Router,private route:ActivatedRoute) {

    this.storing= window.localStorage;
this.userid=this.storing.getItem("userid")

this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/address-card?operation=getaddress&&userid="+this.userid).subscribe(data => {
var boy=data.json();
this.savedaddresses=boy.data
//console.log(boy.data)
//console.log(this.savedaddresses)
this.app.setaddress(boy.data)


})
}

  ngOnInit() {
  //  console.log(this.route.snapshot.queryParams["lat"] +"piking")
    var that=this
    var onSuccess = function(position) {

              let lat = that.route.snapshot.queryParams["lat"];
              let lng = that.route.snapshot.queryParams["lng"];
            //  console.log(lat)
            //  console.log(lng)
if(lat==null&&lng==null){
lat=position.coords.latitude
lng=position.coords.longitude
}
var pop={latitude:lat,longitude:lng}
//console.log(pop)
that.saved(pop)

}


//console.log(this.userid)
this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/address-card?operation=getaddress&&userid="+this.userid).subscribe(data => {
var boy=data.json();
this.savedaddresses=boy.data
//console.log(boy.data)
console.log(this.savedaddresses)
//this.storing.setItem("adding",JSON.stringify(this.savedaddresses))


})

//
function onError(error) {
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }

    // onError Callback receives a PositionError object






    saved(data){


      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+data.latitude+","+data.longitude+"&key=AIzaSyD1Sycc5CNd8Y42QfsRTF5b5sooYFhaZEU").subscribe(data => {
        //console.log(data.json())
      var b=(data.json().results[0].address_components)
      var pincode;
      var locality="";
          for(var f=0;f<b.length;f++){
      if(b[f].types[0]=="postal_code"){
            pincode=b[f].long_name;

}
         if(b[f].types[2]=="sublocality_level_3"&&locality==""){
                      locality=b[f].long_name;
    //  console.log("aki "+locality)
      }

      if(b[f].types[2]=="sublocality_level_2"&&locality==""){
                   locality=b[f].long_name;
  // console.log("aki "+locality)
   }

      }

         this.datarefresh(pincode)
      this.app.add(locality)
      })

    //  this.close1.nativeElement.click();





    }

    datarefresh(data){

console.log("calling")

          this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/items?operation=get&pincode=500070").subscribe(data => {
        var boy=data.json();
      //console.log(boy)
      var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groubedByTeam=groupBy(boy.data, 'itemcategory')
      var data1=groubedByTeam



      if(this.storing.getItem("order")!=null)
      {
       this.hash=JSON.parse(this.storing.getItem("order"))
        var data2=JSON.parse(this.storing.getItem("order"))

      //console.log(data2)
      var m=new Object();
      m=data2;

      //console.log(m["Banana MilkShake"])
      //
        Object.getOwnPropertyNames(data1).forEach(key => {
        for(var t=0;t<data1[key].length;t++){
      if(m[data1[key][t].itemname]){
        var p=JSON.parse(m[data1[key][t].itemname])
        //console.log(p.count)
      data1[key][t].count=p.count


      }
        }
        });

        this.app.itemcount(Object.keys(this.hash).length)

    //ChildCmp



      }
      console.log(data1)

    this.storing.setItem("itemdata",JSON.stringify(data1))

this.router.navigate(['/mobile/test'])
    //  console.log(data1)
      //this.test.saved("hi")

        });

    }


}
