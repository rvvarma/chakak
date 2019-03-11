import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currentorder',
  templateUrl: './currentorder.component.html',
  styleUrls: ['./currentorder.component.css']
})
export class CurrentorderComponent implements OnInit {
  latitude = 17.3223111;
  longitude = 78.5717521;
  mapType = 'satellite';
  constructor() {
//    await delay(1000);
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
