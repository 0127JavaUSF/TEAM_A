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

    restaurant: any [];

  constructor(private restaurantService: RestaurantService, private menuService: MenuService, private router: Router) { }

    ngOnInit(): void {
      this.restaurantService.getRestaurants().subscribe(
        (data) => {
          this.restaurant = data.restaurants;
        },
        (error) => console.log(error)
      );
    }

    /**
     * onRestaurantClick updates the current restaurant variable
     * inside MenuService. MenuService uses that to fetch list of food
     * related to that restaurant
     */
    onRestaurantClick(clickedRestaurant: any) {
        this.menuService.currentRestKey = clickedRestaurant.apiKey;
        // this.menuService.currentRestKey
        this.router.navigate([`/restaurant/${clickedRestaurant.name.split(' ').join('')}`]);
    }


  // reloadData() {
  //   this.restaurant = this.restaurantService.getRestaurantList();
  // }

  // restaurantMenu(id: number){
  //   this.router.navigate(['menu', id]);
  // }

}
