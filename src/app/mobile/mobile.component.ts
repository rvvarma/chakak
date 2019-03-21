import { Component, OnInit,ViewChild ,ElementRef,Inject} from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  title = 'app';
  address:any;
  savedaddresses:any;
  private test : TestComponent;
  @ViewChild('close') close1: ElementRef;


  constructor(private cookieService:CookieService,private http:Http,private router:Router) {
//
    this.address="Locating......"
}
add(a){
//
  this.address=a
  console.log(a)

}
  ngOnInit() {
//this.swing()
    //this.router.navigate(['/mobile'])

    var json={
      "operation": "refresh_token",
      "refresh_token": this.cookieService.get("refresh")

    }
    console.log(json)
    this.http.get("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/address-card?operation=getaddress&&userid=56").subscribe(data => {
    var boy=data.json();
    this.savedaddresses=boy.data
  })
    /*  this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/refreshtoken",json).subscribe(data => {
      var boy=data.json();
    if(boy.Status="Success"){
      this.cookieService.put("access",boy.data.AuthenticationResult.AccessToken)


    }
    else{
    this.router.navigate(['/'])
  }

})*/
  }

  saved(data){
    //this.router.navigate(['/mobile/location'],{ queryParams: { lat: data.latitude, lng: data.longitude } })
  let saro = new TestComponent(data.latitude,data.longitude,this,data);
saro.swing(data.latitude,data.longitude,this,saro);
  //  this.router.navigate(['/mobile/'],{ queryParams: { lat: data.latitude, lng: data.longitude } })
//  this.
this.closemodal()

  }
  closemodal(){

    this.close1.nativeElement.click();
  }

}
