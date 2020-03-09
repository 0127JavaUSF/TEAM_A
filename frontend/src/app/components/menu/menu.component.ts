import { Component, OnInit } from '@angular/core';
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

  constructor(private menuService: MenuService,
    private router: ActivatedRoute) {

    // this is called first. Then ngOnInit is called.

  }

  ngOnInit(): void {
    this.menuService.currentRestKey = this.router.snapshot.params['id'];
    this.menuService.getMenu().subscribe(
      (foodArr) => {
        this.menuService.currentMenu = foodArr
        this.foods = this.menuService.currentMenu;
      },
      error => console.log(error)
    );
  }

}