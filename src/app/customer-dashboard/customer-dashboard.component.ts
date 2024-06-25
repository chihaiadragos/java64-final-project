import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import { BranchesComponent } from '../branches/branches.component';
import { ReservationsComponent } from '../reservations/reservations.component';
import { HomeComponent } from '../routes/home/home.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    HomeComponent,
    AddReservationComponent,
    ReservationsComponent,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    BranchesComponent,
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent {
  constructor(private router: Router, private localService: LocalService) {}
  selectedTabIndex: number = 0;

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
