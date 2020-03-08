import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

class User {
  firstName = " ";
  lastName = " ";
  email = " ";
  password = " ";
  confirmPassword = " ";
  phoneNumber = " ";
  address = " ";
  city = " ";
  state = " ";
  zipCode = " ";
}