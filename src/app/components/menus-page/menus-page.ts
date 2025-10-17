import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Router, RouterLink } from '@angular/router';
import { MenusService } from '../../services/menus-service';
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
  selectedMenuItems:MenuItem[]=[];
  pageNumber:number=1;
  pageSize:number=4;

  constructor(private route:ActivatedRoute,private router:Router,
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


//select menuItems
selectItem(event:any,item:any){
  if(event.target.checked){
    item.quantity=1;
    this.selectedMenuItems.push(item);
  }else{
    this.selectedMenuItems=this.selectedMenuItems.filter(i=>i.id != item.id);
  }
}

Next(){
  if(this.selectedMenuItems.length==0){
    alert("You must select at least 1 item!");
    return;
  }
  this.router.navigate([`/customerData`],
    {
      queryParams:{
        items:JSON.stringify(this.selectedMenuItems),
        restId:this.restaurantId
      }
    });
}



  //pagination

   get paginatedItems() {
      const startIndex = (this.pageNumber - 1) * this.pageSize;
      return this.menuItems.slice(startIndex, startIndex + this.pageSize);
    }

    get totalPages() {
   
      return Math.ceil(this.menuItems.length / this.pageSize);
    }


    changePage(page: number) {
       if(page >=1 && page <= this.totalPages){
      this.pageNumber = page;
      }
    }

    

 

}
