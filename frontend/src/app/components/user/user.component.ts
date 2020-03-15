import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { User } from 'src/app/models/user';
import { orderHistory } from 'src/app/models/orderHistory';
import { Router } from '@angular/router';


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
  currentPass = '';
  newPass = '';
  verifyPass = '';
  toggle = 0;



  constructor(private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.userService.getUser().subscribe(
      data =>  {
        this.user = data; //assigns input from user to each attribute of the user object
      }
    ,
    error => (console.log(error))) ;
  }

  updateUserPassword() {
    if (this.newPass === this.verifyPass) {
      this.userService.updatePassword(this.user.email, this.newPass);
      this.currentPass = '';
      this.newPass = '';
      this.verifyPass = '';
      this.toggle = 1;
    }
  }
  fetchOrderHistory() {
    this.router.navigate(['order-history']);
  }
  // submitProfilePicture(file){
  //   this.user.hasProfilePicture = true;
  //   this.userService.submitPicture(this.user, file);
  // }



}

