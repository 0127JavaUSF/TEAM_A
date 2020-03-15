import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pickup-option',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  @Input()
  pickupAddress: string = "";
  
  @Input()
  estimatedTimePickup: string = "";
  
  @Input()
  paymentType: string = "";

}
