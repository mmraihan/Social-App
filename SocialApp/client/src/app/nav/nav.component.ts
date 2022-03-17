
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any={};
  loggedIn: boolean=false;
  



  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  
  }

  login(){
    this.accountService.logIn(this.model).subscribe(response=>{
   this.router.navigateByUrl("/members")  ;
    },error=>{
      console.log(error)
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

 

 
  }

