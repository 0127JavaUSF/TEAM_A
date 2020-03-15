import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  presignedUrlUser;
  email;
  user = new User();
  id;
  newUser = new NewUser();


  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:9010/user/' + this.email);
  }

  checkUser(email, password): Observable<User> {
    return this.http.post<User>('http://localhost:9010/login?email=' + email + '&password=' + password, {withCredentials: true});
    // .subscribe(
      // data => {
      //   this.id = data.id;
      //   console.log(data);
      //   return data.email;
      //   // Anvar testing
        // localStorage.setItem('cart', "");
    //   },
    //   error => console.log(error)
    // );
  }

  setUser(email) {
    this.email = email;
  }
  setUserId(id)
  {
    this.id = id;
    console.log(id);
  }

  getOrderHistory(): Observable<any>  {
    return this.http.get('http://localhost:9010/order/user/' + this.id);
  }

  updatePassword(email, password) {

    this.newUser.email = email;
    this.newUser.password = password;
    this.http.post('http://localhost:9010/user/updatePassword', this.newUser).subscribe(
    (data) => {
      console.log(data);
    },
    (error) => console.log(error)
    );
  }


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

class NewUser {
  email: '';
  password: '';
}
