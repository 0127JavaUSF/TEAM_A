import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';



@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

    restaurant: any [];

  constructor(private restaurantService: RestaurantService) { }

    ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => this.restaurant = data.restaurants,
      (error) => console.log(error)
    );
    }


  // reloadData() {
  //   this.restaurant = this.restaurantService.getRestaurantList();
  // }

  // restaurantMenu(id: number){
  //   this.router.navigate(['menu', id]);
  // }

}
