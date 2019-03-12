import { Component, OnInit } from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-currentorder',
  templateUrl: './currentorder.component.html',
  styleUrls: ['./currentorder.component.css']
})
export class CurrentorderComponent implements OnInit {
  latitude = 17.3223111;
  longitude = 78.5717521;
  mapType = 'satellite';
  items:any
  constructor(private http:Http) {
//    await delay(1000);

this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/getorder-item?orderid=a1b0e36c-4552-4dd1-98ad-10cc6e165a8e").subscribe(data => {
  this.items={}
var boy=data.json();
console.log(boy)
this.items=boy.data
})
setTimeout(() =>
{
  //  this.router.navigate(['/']);
  console.log("kooo")
  this.latitude=17.3457
  this.longitude=78.5522

},
3000);
  //  await sleep(4000);
   }

  ngOnInit() {
  }

}
