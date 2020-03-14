import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // presignedUrlUser;
  email;

  user = new User();


  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    // console.log(this.email);
    // return this.http.get<User>('http://localhost:9010/user/' + this.email);


    return this.http.post<User>('http://localhost:9010/login', { withCredentials: true })
      // .subscribe(
      //   // email, password
      //   data => {
      //     return data;
      //     // Anvar testing
      //     // localStorage.setItem('cart', "");
      //   },
      //   error => console.log(error)
      // );
  }

  checkUser(email, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Credentials': 'true',
        // 'Authorization': 'auth_token',
        'withcredentials': 'true',
        // 'observe': 'response' as 'response',
      })
    };
    // return this.http.post<User>('http://localhost:9010/login?email=' + email + '&password=' + password, {withcredentials: true})
    this.http.post<User>('http://localhost:9010/login', {"email": email, "password": password}, {withCredentials: true})
    .subscribe(
      // email, password
      data => {
        return data;
        // Anvar testing
        // localStorage.setItem('cart', "");
      },
      error => console.log(error)
    );
  }

  setUser(email) {
    this.email = email;
  }

  // updatePassword(user){
  //   this.http.post('localhost:9010/user/updatePassword', user).subscribe(
  //   (data) => {
  //     user = data;
  //   },
  //   (error) => console.log(error)
  //   );
  // }


  //   submitPicture(user, file){
  //  this.http.post('localhost:9010/user/', user).subscribe(
  //    (data) => {
  //      this.presignedUrlUser = data;
  //    },
  //    (error) => console.log(error)
  //  );

  //  this.http.put(this.presignedUrlUser.presignedUrl,file);
  // }


}
