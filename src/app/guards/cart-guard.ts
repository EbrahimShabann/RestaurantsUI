import { CanActivateFn, Router, UrlSegment } from '@angular/router';
import { CustomerService } from '../services/customer-service';

export const cartGuard: CanActivateFn = (route, state) => {
let router= new Router();
  if(CustomerService.cart.length == 0){
    router.navigateByUrl('/home');
    return false;
  }
  return true;
};
