import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { customerDataDto } from '../../models/check-out-dto';
import { OrderItem } from '../../models/order-item';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../services/order-service';
import { CustomerService } from '../../services/customer-service';

@Component({
  selector: 'app-check-out-page',
  imports: [CurrencyPipe],
  templateUrl: './check-out-page.html',
  styleUrl: './check-out-page.css'
})
export class CheckOutPage  {
customerData!:customerDataDto;
items:OrderItem[]=[];
restauratnId!:number;

  constructor(private route:ActivatedRoute, private router:Router,private orderService:OrderService,
    private _customerService :CustomerService
  ){

      this.customerData=this._customerService.customerData;
      this.items=CustomerService.cart;
      this.restauratnId=this._customerService.restaurantId;
      console.log(this.items)
      this.calcTotalPrice;
  
  }


  

  get calcTotalPrice(){
    return this.customerData.totalPrice=this.items.reduce((pre,curr)=> pre + curr.unitPrice*curr.quantity,0);

  }


  changeQuantity(event:any,item:any){
    item.quantity=event.target.value;
     this.calcTotalPrice;

  }

  increaseQuantity(item:any){
  
      item.quantity+=1;
     this.calcTotalPrice;
  }

  decreaseQuantity(item:any){
      if(item.quantity>1){
         item.quantity-=1;
     this.calcTotalPrice;
      }
     
  }
  
  removeItem(item:any){
    this.items=this.items.filter(i=>i.id != item.id);
         this.calcTotalPrice;


  }
  checkout(){
   const checkOutDto = {
    Name: this.customerData.name,
    Email: this.customerData.email,
    Phone: this.customerData.phone,
    Address: this.customerData.address,
    TotalPrice: this.customerData.totalPrice, 
    OrderItems: this.items.map(i => ({
      FoodItemId: i.id,
      Quantity: i.quantity,
      Price: i.unitPrice 
    }))
  };
    console.log("Sending checkout DTO:", checkOutDto);

      this.orderService.checkOut(checkOutDto).subscribe({
        next:(result)=>{
          alert(result.message);
          CustomerService.cart=[];
          this.router.navigate(['/home']);
        },
        error:(err)=>{
         console.log(err.message);
        }
      })
  }


  goBack(){
    this.router.navigate([`/customerData`]);
  }


}
