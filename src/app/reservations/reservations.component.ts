import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ReservationService } from '../service/reservation.service';
import { LocalService } from '../login/service/local.service';
import { CustomerService } from '../service/customer.service';
import ReservationForm from '../types/reservationForm';





@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit{

  reservations: ReservationForm[] = [];

  ngOnInit(): void {
    const currentUserString = this.localService.getData('currentUser');
    const currentUser = JSON.parse(currentUserString!);
    const type = currentUser.accountType;
    console.log(type)

    if (type === 'CLIENT') {
      this.customerService.getCustomerByUserId(currentUser.id).subscribe(data => {
        console.log(data);
        const id = data.id;
        this.reservationService.getAllReservationsByCustomerId(id).subscribe(data => {
          this.reservations = data;
          console.log(this.reservations);
        })
      })
    } 
    if (type === 'ADMIN'){
      this.reservationService.getAllReservations().subscribe(data => {
        this.reservations = data;
        console.log(this.reservations)
      })
    }

  
  }
  constructor(private reservationService: ReservationService, private localService: LocalService, private customerService: CustomerService) {}
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['id', 'start', 'end', 'amount', 'status'];
}
