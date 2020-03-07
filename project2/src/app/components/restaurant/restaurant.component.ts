import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/Http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  // restaurant: Observable<Restaurant[]>;

  restaurant: [{
    id: number,
    name: string,
    category: string,
    deliveryFee: string,
    picture: string,
    estimatedTime: string
    menu: number
  },
  {
    id: number,
    name: string,
    category: string,
    deliveryFee: string,
    picture: string,
    estimatedTime: string,
    menu: number
  }
];

  // constructor(private restaurantService: RestaurantService, private router: Router) { }
  constructor() {}

  ngOnInit(): void {

    // this.reloadData();
    this.restaurant = [{
      id: 1,
      name: 'Denny\'s',
      category: 'Breakfast',
      deliveryFee: '$2.99',
      picture: 'https://marketingland.com/wp-content/ml-loads/2017/01/Dennys-Diner.jpg',
      estimatedTime: '30 - 45min',
      menu: 1
    },
    {
      id: 2,
      name: 'Mcdonald\'s',
      category: 'Fast Food',
      deliveryFee: 'Free',
      picture: 'https://www.rd.com/wp-content/uploads/2017/12/the-true-story-behind-the-mysterious-mcdonalds-'
      + 'gold-card-673955074-Vytautas-Kielaitis-1024x683.jpg',
      estimatedTime: '30 - 45min',
      menu: 2
    }
  ];
  }
  // reloadData() {
  //   this.restaurant = this.restaurantService.getRestaurantList();
  // }

  // restaurantMenu(id: number){
  //   this.router.navigate(['menu', id]);
  // }

}
