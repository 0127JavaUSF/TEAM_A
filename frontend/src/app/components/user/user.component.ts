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


  user: User;

  //for password update
  currentPass = '';
  newPass = '';
  verifyPass = '';
  toggle = 0;

  //for picture upload
  file;

  //these are for ngmodel values to update user info
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  address = '';
  city = '';
  zipCode = '';



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

  submitProfilePicture() {
    this.user.hasProfilePicture = true;
    this.userService.submitPicture(this.user.id, this.user.hasProfilePicture, this.file);
    this.reloadUser();
  }

  onFileUpload(event) {

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  reloadUser() {
    this.userService.getUser().subscribe(
      data =>  {
        this.user = data; //assigns input from user to each attribute of the user object
      }
    ,
    error => (console.log(error))) ;
  }

  // onPictureSelect(picture) {
  //   if (picture.target.file > 0)
  //   {
  //     this.file = picture.target.file;
  //   }
  // }

}

