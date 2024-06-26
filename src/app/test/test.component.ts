import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from '../routes/home/home.component';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import { ReservationsComponent } from '../reservations/reservations.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { BranchesComponent } from '../branches/branches.component';
import { FleetComponent } from '../routes/fleet/fleet.component';
import { GeneralDashboardComponent } from '../general-dashboard/general-dashboard.component';

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  imports: [
    RouterModule,
    HomeComponent,
    ReservationsComponent,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    AddEmployeeComponent,
    FileUploadComponent,
    AddCarComponent,
    AddBranchComponent,
    BranchesComponent,
    FleetComponent,
    GeneralDashboardComponent
  ],
})
export class TestComponent {
  constructor(private router: Router, private localService: LocalService) {}
  selectedTabIndex: number = 0;

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
