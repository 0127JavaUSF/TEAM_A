import { Component, OnInit } from '@angular/core';
//import { userInfo } from 'os';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  user = {
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
  notMatch = true;

  error = 'Passwords do not match';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  submit() {

    this.notMatch = this.confirmPass(this.user.password, this.confirmPassword);

    if (this.notMatch === true) {
      return this.error;
    }
    return this.httpClient.post('localhost:9010/user', this.user);
  }

  confirmPass(password, confirmPassword) {
    if (password === password) {
      return false;
    } else {
      return true;
    }
  }
}

