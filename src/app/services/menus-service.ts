import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  constructor(private http:HttpClient){};
  private url = "https://localhost:7254/api/Menus";


  GetMenus(restaurantId:number):Observable<any>
  {
    return this.http.get(`${this.url}/GetMenus/${restaurantId}`)
  }

}
