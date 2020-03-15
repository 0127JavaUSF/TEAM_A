import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/sessionservices/session.service';
import { LocationService } from 'src/app/services/locationservice/location.service';


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

  constructor(

    private userService: UserService, 
    private router: Router,
    private sessionService: SessionService,
    // Anvar test
    private locationService: LocationService,

    ) {}

  ngOnInit() {

    this.locationService.currentUserLocation();

    if(this.sessionService.currrentUser.email.length > 0) {
      this.user = this.sessionService.currrentUser;
    } else {
      // make request to fetch data
      this.sessionService.fetchCurrentUser()
        .subscribe(
          data => {
            console.log(data)
            this.user = data;
            console.log(this.user.firstName);
          },
          error => console.log(error),
        );
    }
    // this.userService.getUser().subscribe(
    //   data =>  {
    //     this.user = data; //assigns input from user to each attribute of the user object
    //   }
    // ,
    // error => (console.log(error))) ;
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

