import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';
// import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentUser: User;
  loggedIn: boolean;

  constructor( private http: HttpClient, private router: Router ) {
    this.loggedIn = false;
    this.currentUser = new User();
  }

  /**
   * Fetches current user information from database.
   * Return type: Void
   */
  fetchCurrentUser(): Observable<User> {
    let url = 'http://localhost:9010/fetchCurrentUser';
    return this.http.get<any>(url, { withCredentials: true })
  }

  /**
   * 
   * Basic check if data returned is kind of correct (only checks if email is returned)
   */
  validFetch(data: User): boolean {
    return data.email.length > 0;
  }

  receiveUserData(data: User) {
    if(this.validFetch(data)) {
      this.currentUser = data;
      this.loggedIn = true;
    }
  }

  /**
   * Returns current user data (logged in)
   * or returns NULL if no one is logged in
   */
  getCurrentUser() {
    if(this.isLoggedIn()) {
      return this.currentUser;
    }
    else return null;
  }

  /**
   * Returns true if there is logged in user
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /**
   * Logs out current user
   */
  logout() {
    if(this.isLoggedIn()) {
      const url = "http://localhost:9010/logout";
      this.http.get(url, { withCredentials: true }).subscribe(
        () => {
          console.log("Logged out")
          this.router.navigate(['/'])
        },
        (error) => console.log("ERROR: " + error)
      );
    } else {
      console.log("No one has logged in.");
    }
  }

  ensureLoggedIn() {
    if(!this.isLoggedIn()) {
      this.router.navigate(['sign-in'])
    }
  }

}