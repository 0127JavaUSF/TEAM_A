import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currrentUser = new User();

  constructor(
    private http: HttpClient,
  ) {}

  fetchCurrentUser(): Observable<User> {

    const url = 'http://localhost:9010/fetchCurrentUser';

    return this.http.get<any>(url, {withCredentials: true});
  }

}
