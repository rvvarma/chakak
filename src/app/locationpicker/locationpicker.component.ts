import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
@Component({
  selector: 'app-locationpicker',
  templateUrl: './locationpicker.component.html',
  styleUrls: ['./locationpicker.component.css']
})
export class LocationpickerComponent  {
  zoom: number = 8;
 lat: number = 51.673858;
  lng: number = 7.815982;
  latl:number
  lngl:number
  latn:number
  map:any;
  lngn:number
  address:any;
  constructor(private http:Http){
this.address="No Address"
        if (window.navigator && window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
              position => {
              //    this.geolocationPosition = position,
                      console.log(position)



this.lat=position.coords.latitude;
this.lng=position.coords.longitude;
this.latn=position.coords.latitude;
this.lngn=position.coords.longitude;

bp(this.lat,this.lng,this.http)
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
      };





      setInterval(() => {
      //  console.log(this.latl)
    //  this.lat=this.latl
      //this.lng=this.lngl
    }, 1000);




  }

  // initial center position for the map

centerChange(data){

  this.lat=data.lat;
  this.lng=data.lng;
  //console.log(this.latl)


}

mapReady(map) {
    this.map = map;

    var that = this;

    this.map.addListener("dragend", function () {

console.log(that.lat)
//that.latn=that.latl;
//that.lngn =that.lngl;
bp(that.lat,that.lng,that.http);
    });
/*    this.map.addListener("dragstart", function () {
console.log(that.latl)
that.lat=that.latl;
that.lng=that.lngl;
});*/
}


      handleAddressChange(address) {
        // Do some stuff
       this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address.formatted_address+"&key=AIzaSyD1Sycc5CNd8Y42QfsRTF5b5sooYFhaZEU").subscribe(data => {
                            var boy=data.json();

console.log(boy.results[0].geometry.location)
this.lat=boy.results[0].geometry.location.lat
this.lng=boy.results[0].geometry.location.lng
this.latn=boy.results[0].geometry.location.lat
this.lngn=boy.results[0].geometry.location.lng
bp(this.lat,this.lng,this.http)

                          })
                        //  document.getElementById('lname').value=address



  }

  markerDragEnd( $event: MouseEvent) {
    console.log('dragEnd', $event);
  }

//

// just an interface for type safety.
function bp(lat,lng,hhp){
//console.log("hi")
hhp.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyD1Sycc5CNd8Y42QfsRTF5b5sooYFhaZEU").subscribe(data => {
var boy=data.json();
console.log(boy)
console.log(boy.results[0].formatted_address)
document.getElementById('lname').value=boy.results[0].formatted_address
//console.log(this.address)
})
}
}
