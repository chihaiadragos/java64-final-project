import { Component, OnInit } from '@angular/core';
import Branch from '../types/branch';
import Car from '../types/car';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { FleetService } from '../routes/fleet/fleet.service';
import { BranchService } from '../service/branch.service';

@Component({
  selector: 'app-book-reservation',
  standalone: true,
  imports: [],
  templateUrl: './book-reservation.component.html',
  styleUrl: './book-reservation.component.css'
})
export class BookReservationComponent implements OnInit{

  car: Car | undefined;
  branch: Branch | undefined;

  constructor(
    private router: Router, 
    private fleetService: FleetService, 
    private formBuilder: FormBuilder, 
    private localService: LocalService, 
    private branchService: BranchService
  ){}

  ngOnInit(): void {
    const currentReservationString = this.localService.getData("currentReservation");
    if (currentReservationString) {

      const currentReservation = JSON.parse(currentReservationString);

      console.log(currentReservation.carId);
      console.log(currentReservation.carBranchId);
      console.log(currentReservation.start);

      this.fleetService.getCarById(currentReservation.carId).subscribe(data => {
        this.car = data;
        console.log(data);
      })

      this.branchService.getBranchById(currentReservation.carBranchId).subscribe(data => {
        this.branch = data;
        console.log(data);
      })
    }
    const asdf = this.localService.getData("asdf");
    const qwer = JSON.parse(asdf!);
    console.log(qwer.start);
  }

}
