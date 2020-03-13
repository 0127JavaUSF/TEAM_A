import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';
// import { SignInComponent } from '../components/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  email;

  user = new User();


  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    console.log(this.email);
    return this.http.get<User>('http://localhost:9010/user/' + this.email);
  }

  checkUser(email, password) {
    return this.http.post<User>('http://localhost:9010/login?email=' + email + '&password=' + password, {
    email, password}).subscribe(
      data => {
        this.email = data.email
        // Anvar testing
        // localStorage.setItem('cart', "");
      },
      error => console.log(error)
    );
  }

  setUser(email) {
    this.email = email;
  }

}
