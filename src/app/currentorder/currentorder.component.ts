import { Component, OnInit } from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currentorder',
  templateUrl: './currentorder.component.html',
  styleUrls: ['./currentorder.component.css']
})
export class CurrentorderComponent implements OnInit {

  items:any;
id:any;
active:any;
  //google maps zoom
  zoom: Number = 14;
  renderOpts = {
    suppressMarkers: true,
    polylineOptions: { strokeColor: '#f00' },
  };
//Get Directions
  dir = undefined;
  markerOpts = {
    origin: {
      icon: '/assets/home.png',
    },
    destination: {
      icon: '/assets/restarurent.png',

      // ... properties
    },
  };


  constructor(private http:Http,private route: ActivatedRoute) {
//    await delay(1000);
this.active="todo"

 this.route.params.subscribe(params => {
    this.id = params['id']; // (+) converts string 'id' to a number

       this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/getorder-item?operation=get&id="+this.id).subscribe(data => {
         this.items={}
       var boy=data.json();
       console.log(boy)
       this.items=boy.data

       this.dir = {
         origin: { lat: this.items.latitude, lng: this.items.longitude },
         destination: { lat:this.items.DeliveryBoys.Latitude, lng: this.items.DeliveryBoys.Longitude}
       }
       })





       // In a real app: dispatch action to load the details here.
    });





  //  await sleep(4000);
   }
sayhi(){

  this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/getorder-item?operation=get&id="+this.id).subscribe(data => {
    this.items={}
  var boy=data.json();
  console.log(boy)
  this.items=boy.data

  this.dir = {
    origin: { lat: this.items.latitude, lng: this.items.longitude },
    destination: { lat:this.items.DeliveryBoys.Latitude, lng: this.items.DeliveryBoys.Longitude}
  }
  })}
  ngOnInit() {
    //setInterval(this.sayhi, 10000);


  }

   repeat(){






  }

}
