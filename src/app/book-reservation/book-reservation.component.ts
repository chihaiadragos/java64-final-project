import { Component, OnInit } from '@angular/core';
import Branch from '../types/branch';
import Car from '../types/car';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { FleetService } from '../routes/fleet/fleet.service';
import { BranchService } from '../service/branch.service';
import Reservation from '../types/reservation';
import Swal from 'sweetalert2';
import Customer from '../types/customer';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../service/customer.service';
import { ReservationService } from '../service/reservation.service';
import ResCustomer from '../types/resCustomer';
import ResCar from '../types/resCar';
import ResBranch from '../types/resBranch';


@Component({
  selector: 'app-book-reservation',
  standalone: true,
  imports: [    
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    ReactiveFormsModule],
  templateUrl: './book-reservation.component.html',
  styleUrl: './book-reservation.component.css'
})
export class BookReservationComponent implements OnInit{

  car!: Car;
  branch!: Branch;
  reservation!: Reservation;
  reservationForm: FormGroup;
  carAmount!: number;

  constructor(
    private router: Router, 
    private fleetService: FleetService, 
    private formBuilder: FormBuilder, 
    private localService: LocalService, 
    private branchService: BranchService,
    private customerService: CustomerService,
    private reservationService: ReservationService
  ){
    this.reservationForm = this.formBuilder.group({
      customerId: [0, Validators.required],
      customerFullName: ['', Validators.required],
      carId: [0, Validators.required],
      carModel: ['', Validators.required],
      carBrand: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      branchId: [0, Validators.required],
      pickupCity: [0, Validators.required],
      cost: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const currentReservationString = this.localService.getData("currentReservation");
   

      const currentReservation = JSON.parse(currentReservationString!);

      console.log(currentReservation.carId);
      console.log(currentReservation.carBranchId);
    

    const asdf = this.localService.getData("PeriodData");
    const qwer = JSON.parse(asdf!);
    console.log(qwer.start);
    console.log(qwer.end)
    console.log(qwer.length)

    const clientData = this.localService.getData("currentUser");
    const clientDataString = JSON.parse(clientData!);
    console.log(clientDataString.fullName);

    this.fleetService.getCarById(currentReservation.carId).subscribe((result) => {
      this.car = result;
      this.reservationForm.patchValue({
        carId: this.car.id,
        carModel: this.car.model,
        carBrand: this.car.brand,
        cost: this.car.amount
      })
    })

    this.branchService.getBranchById(currentReservation.carBranchId).subscribe(data => {
      this.branch = data;
      this.reservationForm.patchValue({
        branchId: this.branch.id,
        pickupCity: this.branch.city
      })
    })

    const finalPrice: number = this.car?.amount! * qwer.length;
    // console.log("actual car is: " + this.car);
    console.log(qwer.length);
    // console.log("final price is: " + finalPrice);
    
    this.reservationForm.patchValue({
      dateFrom: qwer.start,
      dateTo: qwer.end,
      customerFullName: clientDataString.fullName
    });

    this.customerService.getCustomerByUserId(clientDataString.id).subscribe(data =>{
      this.reservationForm.patchValue({
        customerId: data.id
      });
    })
  }

  public onSubmit() {

    const asdf = this.localService.getData("asdf");
    const qwer = JSON.parse(asdf!);
    // console.log(qwer.length);
    
    if (this.reservationForm.valid) {
      const formValues = this.reservationForm.value;
      const saveReservation: Reservation = {
        id: -1,
        customer: new ResCustomer(formValues.customerId),
        car: new ResCar(formValues.carId),
        dateFrom: formValues.dateFrom,
        dateTo: formValues.dateTo,
        branch: new ResBranch(formValues.branchId),
        amount: formValues.cost * qwer.length
      };
      console.log(saveReservation);
      this.reservationService.createReservation(saveReservation).subscribe(data => {
        Swal.fire({
          position: 'center',
          icon: "success",
          title: "Reservation submited!",
          showConfirmButton: false,
          timer: 3500
        });
        this.router.navigate(['customer-dashboard']);
      })
    }

  }

}
