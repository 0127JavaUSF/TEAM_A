import { Component, OnInit, ElementRef } from '@angular/core';
import { MenuService } from 'src/app/services/menuservices/menu.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cartservices/cart.service';
import { Food } from 'src/app/models/food';
import { SessionService } from 'src/app/services/sessionservices/session.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  /**
   * variable of type ANY that holds [{}, {}]
   */
  foods: any;
  showButton: boolean;
  FoodQuant = {};
  myCart = JSON.parse(localStorage.getItem("cart"));
  user: User = new User();
  constructor(
    private menuService: MenuService,
    private router: ActivatedRoute,
    private cartService: CartService,
    private sessionService: SessionService,
    ) {

      this.showButton = false;
  
  }

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

    // get current restaurant api key
    this.menuService.currentRestKey = this.router.snapshot.params['id'];
    // fetch its menu (food items)
    this.menuService.getMenu().subscribe(
      (foodArr) => {
        // this is list of food we are looking at
        this.menuService.currentMenu = foodArr;
        // update list of foods of this component
        this.foods = this.menuService.currentMenu;

        for(let i = 0; i < this.foods.length; i++) {
          
          // represents category. It has apiKey, name and items keys.
          let foodCategory = this.foods[i];
          
          // represents array of objs (each obj = food obj)
          let arrayOfFood = foodCategory.items;
          
          for(let j = 0; j < arrayOfFood.length; j++ ) {

            let myCart = JSON.parse(localStorage.getItem("cart"));
            
            let food = arrayOfFood[j];
            let q = 0;

            let currFoodFromStorage = myCart[food.apiKey];
            let qFromStorage = 0;

            // logical flaw: Previously I was calling quantity without checking
            // if storage has this food or not.
            if(currFoodFromStorage != undefined) {
              qFromStorage = currFoodFromStorage.quantity;
            }
                        
            // customer has already selected this food item
            if(qFromStorage > 0) {
              q = qFromStorage;
            }

            console.log(this.FoodQuant);
            
            this.FoodQuant[food.apiKey] = [q, false];
            
          }
        }
      },
      error => console.log(error)
    );

  }

  modifyUp(food: Food) {
    console.log(food);
    // $event.stopPropogation;
    // event.stopPropogation();
    
    this.FoodQuant[food.apiKey][0] += 1;
    console.log(this.FoodQuant[food.apiKey]);
    this.cartService.modifyCart(food, this.FoodQuant[food.apiKey][0]);

  }
  modifyDown(food) {
    if(this.FoodQuant[food.apiKey][0] < 1) {
      return;
    }
    this.FoodQuant[food.apiKey][0] -= 1;
    this.cartService.modifyCart(food, this.FoodQuant[food.apiKey][0]);
  }

  handleHover() {
    return this.showButton = !this.showButton;
  }

}