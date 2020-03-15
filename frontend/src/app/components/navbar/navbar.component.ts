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

  constructor(private router: Router, private sessionService: SessionService) {
    this.user = this.sessionService.getCurrentUser();
  }

  ngOnInit(): void {

    if(!this.sessionService.isLoggedIn()) { 
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

  handleProfile() {
    
    this.sessionService.ensureLoggedIn();
    this.router.navigate(['user-details']);

  }

  handleSession() {
    this.sessionService.ensureLoggedIn();
  }

  handleLogout() {
    this.sessionService.logout();
  }

}