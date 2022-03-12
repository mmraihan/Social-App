
import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any={};
  loggedIn: boolean=false;



  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.logIn(this.model).subscribe(response=>{
      console.warn(response);   
      this.loggedIn=true;
    },error=>{
      console.log(error)
    })
  }
 
  }

