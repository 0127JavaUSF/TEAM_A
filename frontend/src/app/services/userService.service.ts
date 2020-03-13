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
  user = new User();

  constructor(private http: HttpClient, private email: SignInComponent) { }


  // getUser(): Observable<User> {
  //   return this.http.get<User>('http://localhost:9010/user/' + this.email);
  // }

  // submitPicture(user, file){
  //  this.http.post('localhost:9010/user/', user).subscribe(
  //    (data) => {
  //      this.presignedUrlUser = data;
  //    },
  //    (error) => console.log(error)
  //  );

  //  this.http.put(this.presignedUrlUser.presignedUrl,file);
  // }

  updatePassword(user){
    this.http.post('localhost:9010/user/updatePassword', user).subscribe(
    (data) => {
      user = data;
    },
    (error) => console.log(error)
    );
  }

}
