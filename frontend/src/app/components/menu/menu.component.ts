import { Component, OnInit, ElementRef } from '@angular/core';
import { MenuService } from 'src/app/services/menuservices/menu.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(
    private menuService: MenuService,
    private router: ActivatedRoute,
    private elementRef: ElementRef,
    ) {

      this.showButton = false;
      // this.food = 0;
    // this is called first. Then ngOnInit is called.

  }

  ngOnInit(): void {
    this.menuService.currentRestKey = this.router.snapshot.params['id'];
    this.menuService.getMenu().subscribe(
      (foodArr) => {
        this.menuService.currentMenu = foodArr;
        this.foods = this.menuService.currentMenu;
        // populate FoodQuant with apiKey key and value 0;
        // console.log(foodArr.items[1]);
        // foods
        for(let i = 0; i < foodArr.length; i++) {
          for(let j = 0; j < foodArr[i].items.length; j++ ) {
            this.FoodQuant[foodArr[i].items[j].apiKey] = [
              this.FoodQuant[foodArr[i].items[j].apiKey] = 0,
              this.FoodQuant[foodArr[i].items[j].display] = false,
            ]
          }
        }
        // each restaurant has items
      },
      error => console.log(error)
    );
  }

  modifyUp(food) {
    console.log(food);
    // $event.stopPropogation;
    // event.stopPropogation();
    
    this.FoodQuant[food.apiKey][0] += 1;
    console.log(this.FoodQuant[food.apiKey]);
  }
  modifyDown(food) {
    if(this.FoodQuant[food.apiKey][0] < 1) {
      return;
    }
    this.FoodQuant[food.apiKey][0] -= 1;
  }

  handleHover() {
    return this.showButton = !this.showButton;
  }

}