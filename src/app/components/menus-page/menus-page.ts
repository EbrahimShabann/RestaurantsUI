import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenusService } from '../../services/menus-service';
import { Menu } from '../../models/menu';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menus-page',
  imports: [CurrencyPipe,RouterLink,CommonModule],
  templateUrl: './menus-page.html',
  styleUrl: './menus-page.css'
})
export class MenusPage implements OnInit{

  restaurantId!:number;
  menuName!:string;
  menuItems:MenuItem[]=[];
  pageNumber:number=1;
  pageSize:number=4;

  constructor(private route:ActivatedRoute,
     private menuService:MenusService ,private cdr:ChangeDetectorRef){}



  ngOnInit(): void {
    this.restaurantId= Number(this.route.snapshot.paramMap.get('id'));
    this.menuService.GetMenus(this.restaurantId).subscribe({
      next:result=>{
        this.menuItems=result[0].foodItems
        this.menuName=result[0].name;
        console.log(this.menuItems.length);
        this.cdr.detectChanges();
      }
    })
  }

   get paginatedItems() {
      const startIndex = (this.pageNumber - 1) * this.pageSize;
      return this.menuItems.slice(startIndex, startIndex + this.pageSize);
    }

    changePage(page: number) {
       if(page >=1 && page <= this.totalPages){
      this.pageNumber = page;
      }
    }

  get totalPages() {
   
      return Math.ceil(this.menuItems.length / this.pageSize);
      }

}
