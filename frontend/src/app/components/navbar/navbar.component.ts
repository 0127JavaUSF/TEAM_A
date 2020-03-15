import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/sessionservices/session.service';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = new User();
  userOrLogin = "sign-in";

  constructor(private router: Router,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.fetchCurrentUser().subscribe(
      data => this.user = data,
      error => console.log(error),
    )
  }

  ensureLoggedIn() {
    if(this.user.email.length > 0) {
      this.userOrLogin = "user";
    }
    this.router.navigate([`${this.userOrLogin}`])
  }

}