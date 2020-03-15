import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email;
  addresses;
  phoneNumber;
  user: User;


  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userService.getUser().subscribe(
      data =>  {
        this.user = data; //assigns input from user to each attribute of the user object
      }
    ,
    error => (console.log(error))) ;
  }

  submitProfilePicture(file){
    this.user.hasProfilePicture = true;

    this.userService.submitPicture(this.user, file);
  }



}

