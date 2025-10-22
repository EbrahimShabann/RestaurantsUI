import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  static cart:MenuItem[]=[];
  restaurantId!:number;
  customerData:any;


  

}
