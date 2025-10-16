import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MenusPage } from './components/menus-page/menus-page';
import { SearchHome } from './components/search-home/search-home';

export const routes: Routes = [
    {path:"",component:SearchHome},
    {path:"home",component:SearchHome},
    {path:"menus/:id",component:MenusPage}
];
