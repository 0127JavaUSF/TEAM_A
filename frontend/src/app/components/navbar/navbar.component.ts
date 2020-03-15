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
  sessionText: string = "Login";
  loggedin = false;

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
            this.sessionText = "Logout";
            this.loggedin = true;
          }
        },
        (error) => {
          console.log(error);
          this.sessionService.ensureLoggedIn();
        }
      )
    }
    
  }

  handleProfile() {
    
    this.sessionService.ensureLoggedIn();
    this.router.navigate([`user-details/${this.user.id}`]);

  }

  handleSession() {
    // this.sessionService.ensureLoggedIn();
    if(this.sessionService.isLoggedIn()) {
      this.sessionService.logout();
      this.sessionText = "Login";
    } else {
     this.sessionService.ensureLoggedIn(); 
    }
  }

}