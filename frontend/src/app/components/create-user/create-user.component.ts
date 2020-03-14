import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';

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
  notMatch = true;

  error = 'Passwords do not match';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  submit() {

    // call password confirm method
    this.notMatch = this.confirmPass(this.user.password, this.confirmPassword);

    // if passwords aren't equal then stop
    if (this.notMatch === true) {
      return this.error;
    } else {

      // send the post to database
    console.log('some of this works');
    return this.httpClient.post<User>('http://localhost:9010/user', this.user)
    .subscribe(
      data => (console.log('User created')),
      error => (console.log('Error'))
    );

    }
  }

  // confirm that password and confirmed password are the same.
  confirmPass(password, confirmPassword) {
    if (password === confirmPassword) {
      return false;
    } else {
      return true;
    }
  }
}


