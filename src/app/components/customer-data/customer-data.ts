import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-customer-data',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './customer-data.html',
  styleUrl: './customer-data.css'
})

export class CustomerData {
  restaurantId!:number;
  menuItems:MenuItem[]=[];


  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    phone: new FormControl('',[Validators.required, Validators.pattern('^(?:\\+20|0020|0)?1[0125]\\d{8}$')]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    address: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z\u0600-\u06FF0-9\\s,\\.\\-\\/\\#\\(\\)]{20,100}$')]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route:ActivatedRoute,
  ) {
     this.route.queryParams.subscribe(params=>{
          this.restaurantId=params['restId'],
          this.menuItems=params['items']
        console.log(this.menuItems)
       });

  }

  

  get getName() {
    return this.customerForm.controls['name'];
  }
  

  get getPhone() {
    return this.customerForm.controls['phone'];
  }
   

  get getEmail() {
    return this.customerForm.controls['email'];
  }

  get getAddress(){
    return this.customerForm.controls['address'] ;
  }


  submit(){
    if(this.customerForm.valid){
      const formValue= this.customerForm.value;
      this.router.navigate(['/checkout'],{
        queryParams:{
          items:this.menuItems,
          data:JSON.stringify(formValue),
          id:this.restaurantId,
        }
      })
    }
  }

  

}
 