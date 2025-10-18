import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  constructor(private http:HttpClient){};
  private url = "https://restaurants-reservation.runasp.net/api/Menus";


  GetMenus(restaurantId:number):Observable<any>
  {
    return this.http.get(`${this.url}/GetMenus/${restaurantId}`)
  }

}
