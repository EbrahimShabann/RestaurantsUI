import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchHome } from "./components/search-home/search-home";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'RestaurantsUI';
}
