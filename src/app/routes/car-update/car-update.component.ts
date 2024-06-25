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
import { MatSelectModule } from '@angular/material/select';


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
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit{
  carId = Number(this.route.snapshot.params['id']);
  car!: Car;
  carForm: FormGroup;
  branches: Branch[] = [];
  selectedBranch!: number;

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

    this.branchService.getAllAvailableBranches().subscribe((data) => {
      this.branches = data;
    })

    this.fleetService.getCarById(this.carId).subscribe((result) => {
      this.car = result;

      this.selectedBranch = this.car.branch!.id;

      this.carForm.patchValue({
        brand: this.car.brand,
        model: this.car.model,
        carBodyType: this.car.carBodyType,
        color: this.car.color,
        year: this.car.year,
        mileage: this.car.mileage,
        amount: this.car.amount,
        imageUrl: this.car.imageUrl,
        branchId: this.selectedBranch
      });
    });

  }

  public onSubmit() {
    
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
        branch:  this.branches.find(branch => branch.id === formValues.branchId)!
      };
      console.log(updatedCar);
      this.fleetService.updateCar(updatedCar).subscribe((result) => {
        Swal.fire({
          position: 'center',
          icon: "success",
          title: "Car has been updated",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(result);
        this.router.navigate(['/fleet']);
      });
    }
  }

}
