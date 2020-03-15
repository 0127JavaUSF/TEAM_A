import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  user: User;

  email = '';
  password = '';
  id;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  signIn() {
    // potential holder for getting token
    this.userService.checkUser(this.email, this.password).subscribe(
      data => {
        this.user = data;
        if (this.user.email != null)
        {
          this.successfulLogin();
          this.router.navigate(['user']);
        }

      },
      error => console.log(error)
    )
    // if (this.userService.checkUser(this.email, this.password) === null) {
    //   console.log('invalid password');
    // } else {
    //   this.successfulLogin();
    //   this.router.navigate(['user']);
    // }
  }

  successfulLogin() {
    this.userService.email = this.email;
    this.userService.id = this.user.id;
  }

  // old get now in user.service.ts
}