import { Component } from '@angular/core';
import { Routes, CanActivateFn } from '@angular/router';
import { MenusPage } from './components/menus-page/menus-page';
import { SearchHome } from './components/search-home/search-home';
import { CustomerData } from './components/customer-data/customer-data';
import { CheckOutPage } from './components/check-out-page/check-out-page';
import { cartGuard } from './guards/cart-guard';

export const routes: Routes = [
    {path:"",component:SearchHome},
    {path:"home",component:SearchHome},
    {path:"customerData",component:CustomerData,canActivate:[cartGuard]},
    {path:"menus/:id",component:MenusPage},
    {path:"checkout",component:CheckOutPage,canActivate:[cartGuard]}
];
