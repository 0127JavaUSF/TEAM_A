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
  updateUser = new User();


  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:9010/user/' + this.email);
  }

  checkUser(email: string, password: string): Observable < User > {

    const url = 'http://localhost:9010/login';
    const userData = {email, password };

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Credentials': 'true',
    //     'withcredentials': 'true',
    //   })
    // };

    return this.http.post<User>(url, userData, { withCredentials: true });

  }

  setUser(email) {
    this.email = email;
  }

  setUserId(id) {
    this.id = id;
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
    this.http.put(presignedUrl, file).subscribe(
      data => {
        console.log(data)
      },
      error => console.log(error)
    );
  }

  saveAllChanges(id,firstName,lastName,email,phoneNumber,address, state, city,zipCode){
    
    this.updateUser.id = id;
    this.updateUser.firstName = firstName;
    this.updateUser.lastName = lastName;
    this.updateUser.email = email;
    this.updateUser.phoneNumber = phoneNumber;
    this.updateUser.address = address;
    this.updateUser.city = city;
    this.updateUser.state = state;
    this.updateUser.zipCode = zipCode;

    this.http.post<User>('http://localhost:9010/user/updateUser', this.updateUser).subscribe(
      (error) => console.log(error)
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

class updateUser {
  id = 0;
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  address = '';
  state = '';
  city = '';
  zipCode = '';
}