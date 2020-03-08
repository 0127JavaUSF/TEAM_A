import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menuservices/menu.service';

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

  constructor(private menuService: MenuService) { 

    // this is called first. Then ngOnInit is called.

  }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe(
      (foodArr) => {
        this.menuService.currentMenu = foodArr
        this.updateFoods();
      },
      error => console.log(error)
    );
  }

  /**
   * updates foods instance variable of MenuComponent
   */
  updateFoods() {
    this.foods = this.menuService.currentMenu;
  }  

}