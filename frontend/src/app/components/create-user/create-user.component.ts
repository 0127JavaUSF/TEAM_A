import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  user = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
};

  confirmPassword = '';

  toggleShort = 0;
  toggleSpecial = 0;
  toggleMatch = 0;


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  submit() {
      // special characters to match against user input
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/g;
      // checks length of user input
      if (this.user.password.length > 8) {
        // checks if user input contains special chacters
      if (this.user.password.match(specialChar) != null) {
        // checks if passwords match
      if (this.user.password === this.confirmPassword) {
        // sends user to database
        this.httpClient.post<User>('http://localhost:9010/user', this.user)
        .subscribe(
          data => (console.log(data)),
          error => (console.log(error))
        );
        this.user.password = '';
        this.confirmPassword = '';
        this.toggleShort = 0;
        this.toggleSpecial = 0;
        this.toggleMatch = 0;
          } else {
            this.toggleMatch = 1;
            this.toggleSpecial = 0;
            this.toggleShort = 0;
          }
      } else {
        this.toggleSpecial = 1;
        this.toggleShort = 0;
      }
    } else {
      this.toggleShort = 1;
    }

  }
}


