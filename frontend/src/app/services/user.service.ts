import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  presignedUrlUser;

  constructor(private http: HttpClient) { }


  getUser(): Observable<User>{
    return this.http.get<User>('localhost:9010/user/');
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
