import { Component, OnInit } from '@angular/core';
import { FleetService } from '../fleet/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';
import Car from '../../types/car';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BranchService } from '../../service/branch.service';
import Branch from '../../types/branch';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-car-update',
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
    ReactiveFormsModule
  ],
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit{
  carId = Number(this.route.snapshot.params['id']);
  car!: Car;
  carForm: FormGroup;

  constructor(
    private branchService: BranchService, 
    private fleetService: FleetService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router) {
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      carBodyType: ['', Validators.required],
      color: ['', Validators.required],
      year: [0, Validators.required],
      mileage: [0, Validators.required],
      amount: [0, Validators.required],
      imageUrl: ['', Validators.required],
      branchId: [0, Validators.required]
    });
  }
  
  ngOnInit(): void {
    console.log("oninit");
    this.fleetService.getCarById(this.carId).subscribe((result) => {
      this.car = result;
      console.log(this.car);
      this.carForm.patchValue({
        brand: this.car.brand,
        model: this.car.model,
        carBodyType: this.car.carBodyType,
        color: this.car.color,
        year: this.car.year,
        mileage: this.car.mileage,
        amount: this.car.amount,
        imageUrl: this.car.imageUrl,
        branchId: this.car.branch!.id
      });
    });

  }

  public onSubmit() {
    console.log("button pressed");
    
    if (this.carForm.valid) {
      const formValues = this.carForm.value;
      const updatedCar: Car = {
        id: this.carId,
        brand: formValues.brand,
        model: formValues.model,
        carBodyType: formValues.carBodyType,
        color: formValues.color,
        year: formValues.year!,
        mileage: formValues.mileage!,
        amount: formValues.amount!,
        imageUrl: formValues.imageUrl,
        branch:  new Branch(formValues.branchId, '', '')
      };
      console.log(updatedCar);
      this.fleetService.updateCar(updatedCar).subscribe((result) => {
        Swal.fire({
          position: 'center',
          icon: "success",
          title: "Car has been updated",
          showConfirmButton: false,
          timer: 3500
        });
        console.log(result);
        this.router.navigate(['/fleet']);
      });
    }
  }

    // const valYear = formValues.year ?? 0;
    // const valMileage = formValues.mileage ?? 0;
    // const valAmount = formValues.amount ?? 0;

  //   this.myUpdatedCar = new Car(
  //     this.carId,
  //     String(formValues.brand),
  //     String(formValues.model),
  //     String(formValues.carBodyType),
  //     valYear,
  //     String(formValues.color),
  //     valMileage,
  //     valAmount,
  //     String(formValues.imageUrl),
  //     this.car.branch!
  // )
  

    //   this.fleetService.updateCar(this.myUpdatedCar).subscribe((result)=>{

    //   this.router.navigate(['/fleet']);
    // });

  
}
