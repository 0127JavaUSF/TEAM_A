import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email;
  addresses;
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser().subscribe(
      data => {
      this.user.id = data.id;
      this.user.firstName = data.firstName,
      this.user.lastName = data.lastName,
      this.user.email = data.email,
      this.user.password = data.password,
      this.user.hasProfilePicture = data.hasProfilePicture,
      this.user.profilePictureUrl = data.profilePictureUrl,
      this.user.presignedUrl = data.presignedUrl,
      this.user.phoneNumber = data.phoneNumber,
      this.user.address = data.address,
      this.user.city = data.city,
      this.user.state = data.state,
      this.user.zipCode = data.zipCode;
      console.log(data);
    }, error => (console.log(error))) ;
  }
}

