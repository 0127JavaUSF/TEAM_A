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

  user = new User();
  userOrLogin = "sign-in";

  constructor(private router: Router,
    private sessionService: SessionService,
    private http: HttpClient,
    ) { }

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

  logout() {
    const url = "http://localhost:9010/logout";
    this.http.get(url, {withCredentials: true}).subscribe(
      () => {
        console.log("Logged out")
        this.router.navigate(['/'])
      },
      (error) => console.log("ERROR: " + error)
    );
  }

}