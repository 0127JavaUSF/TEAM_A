import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
<<<<<<< HEAD
<<<<<<< HEAD
import { Router } from '@angular/router';

=======
import { UserService } from 'src/app/services/user.service';
>>>>>>> 15429913acd36aea974c7ac4ff48c6dc8bd8ef69
=======
import { UserService } from 'src/app/services/user.service';
>>>>>>> 15429913acd36aea974c7ac4ff48c6dc8bd8ef69
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  user = new User();

  email = '';
  password = '';

<<<<<<< HEAD
<<<<<<< HEAD
  constructor(private httpClient: HttpClient, private router: Router) { }
=======

  constructor(private userService: UserService) { }
>>>>>>> 15429913acd36aea974c7ac4ff48c6dc8bd8ef69
=======

  constructor(private userService: UserService) { }
>>>>>>> 15429913acd36aea974c7ac4ff48c6dc8bd8ef69

  ngOnInit(): void {
  }
  signIn() {
    // potential holder for getting token
<<<<<<< HEAD
<<<<<<< HEAD
    // this.httpClient.post<User>('http://localhost:9010/login?email=' + this.email + '&password=' + this.password, {
    // email: this.email, password: this.password }).subscribe(
    //   data => (console.log(data)),
    //   error => (console.log(error))
    // );
    this.router.navigate(['/user']);
=======
=======
>>>>>>> 15429913acd36aea974c7ac4ff48c6dc8bd8ef69
    if (this.userService.checkUser(this.email, this.password) === null) {
      console.log('broken');
    } else {
      this.successfulLogin();
    }
  }
<<<<<<< HEAD
>>>>>>> 15429913acd36aea974c7ac4ff48c6dc8bd8ef69
=======
>>>>>>> 15429913acd36aea974c7ac4ff48c6dc8bd8ef69

  successfulLogin() {
    this.userService.email = this.email;
  }

  // old get now in user.service.ts
}
