import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

    restaurant: string [];

//   restaurant: [{
//     id: number,
//     name: string,
//     category: string [],
//     deliveryFee: string,
//     picture: string,
//     minTime: number,
//     maxTime: number,
//     menu: number
//   },
//   {
//     id: number,
//     name: string,
//     category: string,
//     deliveryFee: string,
//     picture: string,
//     minTime: number,
//     maxTime: number,
//     menu: number
//   },
//   {
//     id: number,
//     name: string,
//     category: string,
//     deliveryFee: string,
//     picture: string,
//     minTime: number,
//     maxTime: number,
//     menu: number
//   },
//   {
//     id: number,
//     name: string,
//     category: string,
//     deliveryFee: string,
//     picture: string,
//     minTime: number,
//     maxTime: number,
//     menu: number
//   }
// ];

  constructor(private restaurantService: RestaurantService) { }
 // constructor() {}

    ngOnInit(): void {
    //  this.restaurant = this.getAllRestaurants(this.restaurantService.result);
    this.restaurantService.getRestaurants().subscribe(
      (data) => this.getAllRestaurants(data),
      (error) => console.log(error)
    );
    }

    getAllRestaurants(restaurant) {

      for (const rest of restaurant.restaurants) {
        this.restaurant.push(rest);
      }
      // console.log(restaurant);
      // return this.restaurant;
    }

    // createImgFromBlob(image: Blob) {
    //   const reader = new FileReader();

    //   reader.addEventListener('load', () => {
    //     this.img = reader.result;
    //   }, false);
    //   if (image) {
    //     reader.readAsDataURL(image);
    //   }
    // }
  // ngOnInit(): void {

  //   // this.reloadData();
  //   this.restaurant = [{
  //     id: 1,
  //     name: 'Denny\'s',
  //     category: ['Breakfast'],
  //     deliveryFee: '2.99',
  //     picture: 'https://marketingland.com/wp-content/ml-loads/2017/01/Dennys-Diner.jpg',
  //     minTime: 30,
  //     maxTime: 45,
  //     menu: 1
  //   },
  //   {
  //     id: 2,
  //     name: 'Mcdonald\'s',
  //     category: 'Fast Food',
  //     deliveryFee: 'Free',
  //     picture: 'https://www.rd.com/wp-content/uploads/2017/12/the-true-story-behind-the-mysterious-mcdonalds-'
  //     + 'gold-card-673955074-Vytautas-Kielaitis-1024x683.jpg',
  //     minTime: 30,
  //     maxTime: 45,
  //     menu: 2
  //   },
  //   {id: 3,
  //   name: 'Zaxby\'s',
  //   category: 'Dinner/Lunch',
  //   deliveryFee: '5.99',
  //   picture: 'https://www.mississippiweekend.com/wp-content/uploads/2019/02/20190130_125646-1024x768.jpg',
  //   minTime: 50,
  //   maxTime: 65,
  //   menu: 3
  //   },
  //   {      id: 4,
  //     name: 'Yats',
  //     category: 'Lunch',
  //     deliveryFee: '2.99',
  //     picture: 'https://snworksceo.imgix.net/bsd/6199bf62-0b5b-4036-b388-cbdb41c6b53f.sized-1000x1000.JPG?w=1000',
  //     minTime: 25,
  //     maxTime: 35,
  //     menu: 4
  //   }
  // ];
  // }
  // reloadData() {
  //   this.restaurant = this.restaurantService.getRestaurantList();
  // }

  // restaurantMenu(id: number){
  //   this.router.navigate(['menu', id]);
  // }

}
