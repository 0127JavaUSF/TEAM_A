import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';
import { MenuService } from 'src/app/services/menuservices/menu.service';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

    restaurant: any [];

  constructor(private restaurantService: RestaurantService, private menuService: MenuService) { }

    ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => this.restaurant = data.restaurants,
      (error) => console.log(error)
    );
    }

    onRestaurantClick(clickedRestaurant: any) {
        this.menuService.currentRestKey = clickedRestaurant.apiKey;
        console.log(clickedRestaurant.apiKey);
    }


  // reloadData() {
  //   this.restaurant = this.restaurantService.getRestaurantList();
  // }

  // restaurantMenu(id: number){
  //   this.router.navigate(['menu', id]);
  // }

}
