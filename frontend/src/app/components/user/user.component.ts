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

  email;
  addresses;
  phoneNumber;
  user = new User();
  currentPass = '';
  newPass = '';
  verifyPass = '';
  toggle = 0;

  constructor(

    private userService: UserService, 
    private router: Router,
    private sessionService: SessionService,
    private locationService: LocationService,

    ) {}

  ngOnInit() {

    this.locationService.currentUserLocation();

    if (!this.sessionService.isLoggedIn()) {
      this.sessionService.fetchCurrentUser().subscribe(
        (data) => {
          this.sessionService.receiveUserData(data);
          this.user = this.sessionService.getCurrentUser();
        },
        (error) => {
          console.log(error);
          this.sessionService.ensureLoggedIn();
        }
      )
    }

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

