import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

@ViewChild('myInput')
export class UserComponent implements OnInit {

  myInputVariable: ElementRef;

  user: User;

  // for password update
  currentPass = '';
  newPass = '';
  verifyPass = '';
  toggle = 0;
  toggleShort = 0;
  toggleSpecial = 0;
  toggleMatch = 0;

  // for picture upload
  file;

  // these are for ngmodel values to update user info
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  address = '';
  state = '';
  city = '';
  zipCode = '';

  constructor(

    private userService: UserService,
    private router: Router,
    private sessionService: SessionService,
    private locationService: LocationService,

    ) {
      this.user = this.sessionService.getCurrentUser();
      // this.user.firstName  = "Alex";
    }

  ngOnInit() {

    this.locationService.currentUserLocation();


    if (!this.sessionService.isLoggedIn()) {
      this.sessionService.fetchCurrentUser().subscribe(
        (data) => {
          this.sessionService.receiveUserData(data);
          this.user = this.sessionService.getCurrentUser();
          console.log("hey: " + this.user.password);
        },
        (error) => {
          console.log(error);
          this.sessionService.ensureLoggedIn();
        }
      )

    }

  }

  updateUserPassword() {
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/g;
    if (this.newPass.length > 8) {
    if (this.newPass.match(specialChar) != null) {
    if (this.newPass === this.verifyPass) {
      this.userService.updatePassword(this.user.email, this.newPass);
      this.currentPass = '';
      this.newPass = '';
      this.verifyPass = '';
      this.toggle = 1;
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

  fetchOrderHistory() {
    this.userService.setUserId(this.user.id);
    this.router.navigate(['order-history']);
  }

  submitProfilePicture() {
    this.user.hasProfilePicture = true;
    this.userService.submitPicture(this.user.id, this.user.hasProfilePicture, this.file);
    this.router.navigate(['user']);
  }

  onFileUpload(event) {

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  // reloadUser() {
  //   this.userService.getUser().subscribe(
  //     data =>  {
  //       this.user = data; // assigns input from user to each attribute of the user object
  //     }
  //   ,
  //   error => (console.log(error))) ;
  // }

  onPictureSelect(picture) {
    if (picture.target.file > 0)
    {
      this.file = picture.target.file;
    }
  }

  saveAllChanges(){
    // if (this.user.firstName != this.firstName)
    this.userService.saveAllChanges(this.user.id, this.firstName, this.lastName, this.email, this.phoneNumber,this.address,this.city,this.state,this.zipCode);

  }

}

