import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';
import { MenuService } from 'src/app/services/menuservices/menu.service';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food';
import { SessionService } from 'src/app/services/sessionservices/session.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

    allRestaurants: any [];
    location: string;
    food = new Food();
    user: User = new User();

  constructor(private restaurantService: RestaurantService, 
    private menuService: MenuService, 
    private router: Router,
    private sessionService: SessionService) {}

    ngOnInit(): void {

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
        },
        (error) => console.log(error)
      );    }


    /**
     * onRestaurantClick updates the current restaurant variable
     * inside MenuService. MenuService uses that to fetch list of food
     * related to that restaurant
     */
    onRestaurantClick(clickedRestaurant: any) {
        this.menuService.currentRestKey = clickedRestaurant.apiKey;

        localStorage.setItem("restAddress", clickedRestaurant.streetAddress);
        localStorage.setItem("restName", clickedRestaurant.name);
        localStorage.setItem("deliveryPrice", clickedRestaurant.deliveryPrice);

        this.router.navigate([`/restaurants/${this.menuService.currentRestKey}`]);
        let dummyFood = {};
        this.food.apiKey = "123";
        this.food.basePrice = 2.99;
        this.food.description = "This food is awesome";
        this.food.name = "Le'Food";

        dummyFood["123"] = {
          "foodItem": this.food,
          "quantity": 1,
        }

        localStorage.setItem("cart", JSON.stringify(dummyFood))

    }

    onDeliveryClick() {
      const delivery = document.getElementById('delivery');
      const pickup = document.getElementById('pickup');
      delivery.className = 'norm_font option_select  option_selected';
      pickup.className = 'norm_font option_select';
      this.restaurantService.method = 'delivery';
      this.restaurantService.getDeliveryRestaurants().subscribe(
        (data) => {
          this.allRestaurants = data.restaurants;
        },
        (error) => console.log(error)
      );

    }
    onPickupClick() {
      const delivery = document.getElementById('delivery');
      const pickup = document.getElementById('pickup');
      delivery.className = 'norm_font option_select';
      pickup.className = 'norm_font option_select option_selected';
      this.restaurantService.method = 'pickup';
      this.restaurantService.getPickupRestaurants().subscribe(
        (data) => {
          this.allRestaurants = data.restaurants;
        },
        (error) => console.log(error)
      );
    }

    onNewLocation() {
      localStorage.removeItem('address');
      this.restaurantService.newAddress = this.location;
      this.restaurantService.setRestaurantAddress();
      this.restaurantService.getNewRestaurants().subscribe(
        (data) => {
          this.allRestaurants = data.restaurants;
        },
        (error) => console.log(error)
      );
    }

}