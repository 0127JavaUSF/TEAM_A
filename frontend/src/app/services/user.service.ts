import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';
import { SignInComponent } from '../components/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new User();

  constructor(private http: HttpClient, private email: SignInComponent) { }


  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:9010/user/' + this.email);
  }

}
