import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginCreds } from 'src/app/models/LoginCreds';
import { SessionService } from 'src/app/services/sessionservices/session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  /**
   * holds entire user object
   */
  user: User;

  wrongpass = false;

  /**
   * holds login credentials: email and password
   */
  loginCreds = new LoginCreds();

  constructor(

    private userService: UserService,
    private router: Router,
    private sessionService: SessionService,

    ) {}

  ngOnInit(): void {
    if (!this.sessionService.isLoggedIn()) {
      this.sessionService.fetchCurrentUser().subscribe(
        (data) => {
          this.sessionService.receiveUserData(data);
          this.user = this.sessionService.getCurrentUser();
        },
        (error) => {
          console.log(error);
          this.sessionService.ensureLoggedIn();
        }
      )
    }
  }
  
  signIn() {
    /**
     * logs in user given user email and password
     */
    this.userService.checkUser(this.loginCreds.email, this.loginCreds.password)
      .subscribe(
        data => {
          this.user = data;
          this.sessionService.currentUser = data;
          console.log(this.user);
          if (this.user.email != null) {
            // this.successfulLogin();
            this.router.navigate([`user-details/${this.user.id}`]);
          }
        },
        error => this.wrongpass = true
      );
  }

  // successfulLogin() {
  //   this.userService.email = this.loginCreds.email;
  //   this.userService.id = this.user.id;
  // }

}