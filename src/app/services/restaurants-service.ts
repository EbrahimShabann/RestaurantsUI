import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  constructor(private http:HttpClient){};
  private url = "https://restaurants-reservation.runasp.net/api/Restaurants";


  GetRestaurantsByCityOrName(city:string,name:string):Observable<any>
  {
    return this.http.get(`${this.url}/GetRestaurantsByCityOrName?city=${city}&name=${name}`)
  }

  GetFeaturedRestaurants():Observable<any>
  {
    return this.http.get(`${this.url}/GetFeaturedRestaurants`)

  }

}
