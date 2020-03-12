import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  user = new User();

  email = '';
  password = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  signIn() {
    // potential holder for getting token
    console.log('wait this doesnt work yet ;D');
    this.httpClient.post<string>('http://localhost:9010/login', {
    email: this.email, password: this.password }).subscribe(
      data => (console.log(data)),
      error => (console.log(error))
    );

  }

  // old get now in user.service.ts
}
