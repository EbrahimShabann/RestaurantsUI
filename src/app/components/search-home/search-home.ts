import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantsService } from '../../services/restaurants-service';
import { IRestaurant } from '../../models/irestaurant';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-home',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './search-home.html',
  styleUrl: './search-home.css'
})
export class SearchHome  {
selectedCity:string='';
restaurantName:string='';
restaurants : IRestaurant[]=[];
featuredRestaurants : IRestaurant[]=[];
pageNumber:number=1;
pageSize:number=4;


constructor(private restService : RestaurantsService ,
   private cdr:ChangeDetectorRef ){ this.restService.GetFeaturedRestaurants().subscribe({
        next:(result)=>{
          this.featuredRestaurants=result;
          console.log(this.restaurants);
          this.cdr.detectChanges();

        },
        error:(err)=>{
          console.log(err);
        }
      });}


  

  search(){
   this.restService.GetRestaurantsByCityOrName(this.selectedCity,this.restaurantName).subscribe({
    next:(result)=>{
      this.restaurants=result;
      this.featuredRestaurants=[];
      console.log(this.restaurants);
      this.cdr.detectChanges();
      this.pageNumber=1;

    },
    error:(err)=>{
      console.log(err);
    }
   })
  }

    get paginatedRestaurants() {
      const startIndex = (this.pageNumber - 1) * this.pageSize;
    
      if(this.featuredRestaurants.length == 0){   //forthe first time the page load itcontains the featured restaurants
      return this.restaurants.slice(startIndex, startIndex + this.pageSize);
      }
      return this.featuredRestaurants.slice(startIndex, startIndex + this.pageSize);

    }

     get totalPages() {
    if(this.featuredRestaurants.length==0){
      return Math.ceil(this.restaurants.length / this.pageSize);
    }
      return Math.ceil(this.featuredRestaurants.length / this.pageSize);

      }

    changePage(page: number) {
       if(page >=1 && page <= this.totalPages){
      this.pageNumber = page;
      }
    }

 
    
  
}
