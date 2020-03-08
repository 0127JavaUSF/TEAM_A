import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  address = '';
  constructor() { }

  ngOnInit(): void {
  }

  search() {

    console.log('search works');

  }
}
