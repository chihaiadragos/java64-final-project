import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: any;

  constructor(private router: Router, private localService: LocalService) { }
  gotoFleet() {
    this.router.navigate(['fleet']);
  }
  gotoHome() {
    this.router.navigate(['']);
  }
  gotoAbout() {
    this.router.navigate(['about']);
  }
  gotoContact() {
    this.router.navigate(['contact']);
  }

  public logOut() {
    this.localService.clearData();
  }

  public isLoggedIn() {
  
    if (this.localService.getData("currentUser")){
      this.user = JSON.parse(this.localService.getData("currentUser")!);
      return true;
    } else {
      return false;
    }
  }
  
}
