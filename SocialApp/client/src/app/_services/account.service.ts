import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl='https://localhost:44328/'

  constructor(private http: HttpClient) { }

  logIn(model: any){
    this.http.post(this.baseUrl+ 'account/login', model);
  }
}
