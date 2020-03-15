import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  email;
  user = new User();
  id;
  newUser = new NewUser();
  picUser = new PicUser();
  presignedUrlUser = new User();


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


    submitPicture(id, hasFile, file) {
      this.picUser.hasProfilePic = hasFile;
      this.picUser.id = id;

      this.http.post<User>('http://localhost:9010/user/uploadProfilePic', this.picUser).subscribe(
        (data) => {
          this.presignedUrlUser = data;
          this.uploadPicture(this.presignedUrlUser.presignedUrl, file);
        },
        (error) => console.log(error)
      );
  }

  uploadPicture(presignedUrl, file) {
    console.log(presignedUrl);
    this.http.put(presignedUrl, file).subscribe(
      data => {
      },
      error => console.log(error)
    );
  }
}

class NewUser {
  email: '';
  password: '';
}

class PicUser {
  id: '';
  hasProfilePic: boolean;
  presignedUrl: '';
}
