import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  title = 'app';
  address:any;
  @ViewChild('close') close1: ElementRef;

  constructor(private cookieService:CookieService,private http:Http,private router:Router) {

    this.address="Locating......"
}
add(a){
//
  this.address=a
  console.log(a)

}
  ngOnInit() {

    //this.router.navigate(['/mobile'])
    var json={
      "operation": "refresh_token",
      "refresh_token": this.cookieService.get("refresh")

    }
    console.log(json)

      this.http.post("https://3q4jnoy6zf.execute-api.ap-south-1.amazonaws.com/prod/refreshtoken",json).subscribe(data => {
      var boy=data.json();
    if(boy.Status="Success"){
      this.cookieService.put("access",boy.data.AuthenticationResult.AccessToken)
    }
    else{
    this.router.navigate(['/'])
  }

    })
  }
  closemodal(){

    this.close1.nativeElement.click();
  }

}
