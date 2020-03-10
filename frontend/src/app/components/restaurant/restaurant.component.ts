import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';
import { MenuService } from 'src/app/services/menuservices/menu.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

    allRestaurants: any [];
    deliveryRestaurants: any[];
    pickupRestaurants: any[];
    location: string;

  constructor(private restaurantService: RestaurantService, private menuService: MenuService, private router: Router) { }

    ngOnInit(): void {
      if (localStorage.getItem('address') === null) {
        this.restaurantService.setRestaurantAddress();
      }
      if (localStorage.getItem('address') === 'undefined') {
        localStorage.removeItem('address');
      }
      this.restaurantService.loadRestaurantAddress();
      this.restaurantService.getRestaurants().subscribe(
        (data) => {
          this.allRestaurants = data.restaurants;
          this.location = data.address.streetAddress;

          // this.allRestaurants.forEach(element => {
          //   if (this.allRestaurants[element].offersDelivery === true) {
          //   this.deliveryRestaurants.push(this.allRestaurants[element]);
          //   }
          // });

          // this.allRestaurants.forEach(element => {
          //   if (this.allRestaurants[element].offersPickup === true) {
          //   this.pickupRestaurants.push(this.allRestaurants[element]);
          //   }
          // });
        },
        (error) => console.log(error)
      );
    // this.restaurant = this.restaurantService.restaurants;
    }


    /**
     * onRestaurantClick updates the current restaurant variable
     * inside MenuService. MenuService uses that to fetch list of food
     * related to that restaurant
     */
    onRestaurantClick(clickedRestaurant: any) {
      // if(this.menuService.currentRestKey.length === 0) {
        this.menuService.currentRestKey = clickedRestaurant.apiKey;
      // }
      // this.menuService.currentRestKey
      // clickedRestaurant.name.split(' ').join('')
        this.router.navigate([`/restaurants/${this.menuService.currentRestKey}`]);
    }

    onDeliveryClick() {
      const delivery = document.getElementById('delivery');
      const pickup = document.getElementById('pickup');
      delivery.className = 'norm_font option_select  option_selected';
      pickup.className = 'norm_font option_select';
      // this.allRestaurants = this.deliveryRestaurants;

    }
    onPickupClick() {
      const delivery = document.getElementById('delivery');
      const pickup = document.getElementById('pickup');
      delivery.className = 'norm_font option_select';
      pickup.className = 'norm_font option_select option_selected';
      // this.allRestaurants = this.deliveryRestaurants;
    }


  // reloadData() {
  //   this.restaurant = this.restaurantService.getRestaurantList();
  // }

  // restaurantMenu(id: number){
  //   this.router.navigate(['menu', id]);
  // }

}
