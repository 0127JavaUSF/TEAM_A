import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  addresses;

  user: any;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.getUser();
    console.log(this.user);
  }

  submitProfilePicture(file){
    this.user.hasProfilePicture = true;

    this._userService.submitPicture(this.user, file);
  }
}

