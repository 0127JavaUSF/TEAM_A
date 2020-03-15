import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'delivery-option',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  address: string = "";

  @Input()
  estimatedArrTime: string = "";

  @Input() 
  paymentType: string = "";

}
