import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private url='http://restaurants-reservation.runasp.net/api/Orders';

  constructor(private http:HttpClient){}

  checkOut(checkOutDto:any):Observable<any>{
    return this.http.post(`${this.url}/CheckOut`,checkOutDto);
  }
}
