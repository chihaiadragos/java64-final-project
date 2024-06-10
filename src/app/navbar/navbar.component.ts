import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  type: string = "";

  constructor(private router: Router, private localService: LocalService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    

    const currentUserString = this.localService.getData("currentUser");
    if (currentUserString) {

      const currentUser = JSON.parse(currentUserString);

      this.userID = currentUser.id;
      this.type = currentUser.accountType;
      console.log("the user id is " + this.userID);
    }

  }

  public logOut() {
    
    this.localService.clearData();
    this.type = "";
    this.userID = null;
    this.cdr.detectChanges();
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
  
    if (this.localService.getData("currentUser")){
      this.user = JSON.parse(this.localService.getData("currentUser")!);
      return true;
    } else {
      return false;
    }
  }
  public isAdmin() {
    return this.type === 'ADMIN';
  }

}
