import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ReservationService } from '../service/reservation.service';
import { LocalService } from '../login/service/local.service';
import { CustomerService } from '../service/customer.service';
import ReservationForm from '../types/reservationForm';
import { CommonModule } from '@angular/common';
import UpdateStatus from '../types/updateStatus';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent implements OnInit {
  reservations: ReservationForm[] = [];
  displayedColumns: string[] = ['id', 'start', 'end', 'amount', 'status'];
  type: string = '';

  ngOnInit(): void {
    const currentUserString = this.localService.getData('currentUser');
    const currentUser = JSON.parse(currentUserString!);
     this.type = currentUser.accountType;

    if (this.type === 'CLIENT') {
      this.customerService
        .getCustomerByUserId(currentUser.id)
        .subscribe((data) => {
          console.log(data);
          const id = data.id;
          this.reservationService
            .getAllReservationsByCustomerId(id)
            .subscribe((data) => {
              this.reservations = data;
              this.sortReservationsById();
              console.log(this.reservations);
            });
        });
    }
    if (this.type === 'ADMIN') {
      this.reservationService.getAllReservations().subscribe((data) => {
        this.displayedColumns.push('actions');
        this.reservations = data;
        this.sortReservationsById();
        console.log(this.reservations);
      });
    }
  }
  constructor(
    private reservationService: ReservationService,
    private localService: LocalService,
    private customerService: CustomerService,
    private router: Router
  ) {}
  private sortReservationsById(): void {
    this.reservations.sort((a, b) => b.id - a.id);
  }
  getStatusClass(status: string) {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'DECLINED':
        return 'status-declined';
      case 'ACCEPTED':
        return 'status-accepted';
      case 'COMPLETED':
        return 'status-completed';
      case 'REFUNDED':
        return 'status-refunded';
      default:
        return '';
    }
  }
  isAdmin(): boolean {
    return this.type === 'ADMIN';
  }
  updateReservation() {
    console.log("Update reservation");
    
  }
}
