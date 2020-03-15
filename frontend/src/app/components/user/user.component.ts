import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
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
  user: User;
  currentPass = '';
  newPass = '';
  verifyPass = '';
  toggle = 0;



  constructor(private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.userService.getUser().subscribe(
      data =>  {
        this.user = data;
      }
      // {
      // this.user.id = data.id;
      // this.user.firstName = data.firstName,
      // this.user.lastName = data.lastName,
      // this.user.email = data.email,
      // this.user.password = data.password,
      // this.user.phoneNumber = data.phoneNumber,
      // this.user.hasProfilePicture = data.hasProfilePicture,
      // this.user.profilePictureUrl = data.profilePictureUrl,
      // this.user.presignedUrl = data.presignedUrl,
      // this.user.address = data.address,
      // this.user.city = data.city,
      // this.user.state = data.state,
      // this.user.zipCode = data.zipCode;
    // }
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

    // this.userService.submitPicture(this.user, file);
  // }



}

