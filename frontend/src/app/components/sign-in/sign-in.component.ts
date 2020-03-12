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
    // potential holder for getUser
    console.log('wait this doesnt work yet ;D');
    this.httpClient.post<User>('http://localhost:9010/login', {
    email: this.email, password: this.password } );

  }

  /*this.httpClient.get<User>('http://localhost:9010/user/' + this.email)
    .subscribe(
      data => {
        this.user.id = data.id;
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.email = data.email;
        this.user.password = data.password;
        this.user.hasProfilePicture = data.hasProfilePicture;
        this.user.profilePictureUrl = data.profilePictureUrl;
        this.user.presignedUrl = data.presignedUrl;
        this.user.phoneNumber = data.phoneNumber;
        this.user.address = data.address;
        this.user.city = data.city;
        this.user.state = data.state;
        this.user.zipCode = data.zipCode;
        console.log(this.user);
      },
      error => (console.log('Error'))
    );*/
}
