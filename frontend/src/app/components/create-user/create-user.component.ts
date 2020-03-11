import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
// import { userInfo } from 'os';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  user = User;

  constructor() { }

  ngOnInit(): void {
  }

}


