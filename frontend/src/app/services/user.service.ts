import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';
import { SignInComponent } from '../components/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  presignedUrlUser;
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

  updatePassword(user){
    this.http.post('localhost:9010/user/updatePassword', user).subscribe(
    (data) => {
      user = data;
    },
    (error) => console.log(error)
    );
  }


    submitPicture(user, file){
   this.http.post('localhost:9010/user/', user).subscribe(
     (data) => {
       this.presignedUrlUser = data;
     },
     (error) => console.log(error)
   );

   this.http.put(this.presignedUrlUser.presignedUrl,file);
  }


}
