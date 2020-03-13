import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  user = new User();

  email = '';
  password = '';
  id;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  signIn() {
    // potential holder for getting token
    if (this.userService.checkUser(this.email, this.password) === null) {
      console.log('broken');
    } else {
      this.successfulLogin();
    }
  }

  successfulLogin() {
    this.userService.email = this.email;
  }

  // old get now in user.service.ts
}
