import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl='https://localhost:44328/api/'
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$=this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  logIn(model: any) : Observable<any>{
   return this.http.post(this.baseUrl+ 'account/login', model).pipe(
    map((response: User)=>{
      const user= response;
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })
   );
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}