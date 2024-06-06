import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule,MatGridListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user: any;
  userID: string | null = null;

  constructor(private router: Router, private localService: LocalService) { }
  ngOnInit(): void {
    const currentUserString = this.localService.getData("currentUser");
    if (currentUserString) {

      const currentUser = JSON.parse(currentUserString);

      this.userID = currentUser.id;
      console.log("the user id is " + this.userID);
    }
  }
  // gotoFleet() {
  //   this.router.navigate(['fleet']);
  // }
  // gotoHome() {
  //   this.router.navigate(['']);
  // }
  // gotoAbout() {
  //   this.router.navigate(['about']);
  // }
  // gotoContact() {
  //   this.router.navigate(['contact']);
  // }

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
