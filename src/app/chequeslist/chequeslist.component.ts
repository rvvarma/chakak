import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chequeslist',
  templateUrl: './chequeslist.component.html',
  styleUrls: ['./chequeslist.component.css']
})
export class ChequeslistComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
login(){
  console.log("login")
this.router.navigate(['/mobile'])

}
}
