import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email = '';
  password = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  signIn() {
    // potential holder for getUser
    console.log('wait this doesnt work yet ;D');
    return this.httpClient.get<User>('localhost:9010/user/' + this.email);

  }

}
