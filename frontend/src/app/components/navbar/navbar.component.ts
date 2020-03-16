import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/sessionservices/session.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userOrLogin = "sign-in";
  user: User = new User();
  sessionText: string = "Logout";
  test = false;

  constructor(private router: Router, private sessionService: SessionService) {
    this.user = this.sessionService.getCurrentUser();
  }

  ngOnInit(): void {

    if(!this.sessionService.isLoggedIn()) { 
      this.sessionService.fetchCurrentUser().subscribe(
        (data) => {
          this.sessionService.receiveUserData(data);
          this.user = this.sessionService.getCurrentUser();
          if(this.sessionService.isLoggedIn()) {
            this.test = true;
            // this.sessionText = "Logout";
          }
        },
        (error) => {
          console.log(error);
          this.sessionService.ensureLoggedIn();
        }
      )
    }
    
  }

  showButtons() {
    // if(this.sessionService.isLoggedIn()) {
    //   this.loggedin = true;
    //   return true;
    // } else {
    //   this.loggedin = false;
    //   this.sessionText = "Login";
    //   return false;
    // }
    this.test = !this.test;
  }

  handleProfile() {
    
    this.sessionService.ensureLoggedIn();
    this.router.navigateByUrl(`user-details/${this.user.id}`);

  }

  handleSession() {
    if(this.test === true) {
      this.showButtons();
      this.sessionService.logout();
    }
    // this.test = !this.test;

    // // this.sessionService.ensureLoggedIn();
    // if(this.sessionService.isLoggedIn()) {
    //   this.sessionService.logout();
    //   this.sessionText = "Login";
    // } else {
    //  this.sessionService.ensureLoggedIn(); 
    // }
  }

}