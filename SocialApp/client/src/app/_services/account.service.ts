import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl='https://localhost:44328/api/'

  constructor(private http: HttpClient) { }

  logIn(model: any) : Observable<any>{
   return this.http.post(this.baseUrl+ 'account/login', model);
  }
}
