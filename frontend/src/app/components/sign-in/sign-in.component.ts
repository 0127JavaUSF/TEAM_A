import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  user = new User();

  email = '';
  password = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  signIn() {
    // potential holder for getting token
    // this.httpClient.post<User>('http://localhost:9010/login?email=' + this.email + '&password=' + this.password, {
    // email: this.email, password: this.password }).subscribe(
    //   data => (console.log(data)),
    //   error => (console.log(error))
    // );
    this.router.navigate(['/user']);

  }

  // old get now in user.service.ts
}
