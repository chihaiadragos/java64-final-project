import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { RegisterService } from '../register/register.service';
import { BranchService } from '../service/branch.service';
import Branch from '../types/branch';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import RegisterClient from '../types/register';
import { FleetComponent } from '../routes/fleet/fleet.component';
import { FleetService } from '../routes/fleet/fleet.service';
import Car from '../types/car';
import Banana from '../types/newcar';

interface CarBodyType {
  value: string;
}

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit{
  allBranches: Branch[] = [];

  allCarBodyTypes: CarBodyType[] = [
    {value: "HATCHBACK"},
    {value: "SEDAN"},
    {value: "SUV"},
    {value: "COUPE"},
    {value: "CONVERTIBLE"},
    {value: "PICKUP_TRUCK"}
  ]
  constructor(private router: Router, private fleetService: FleetService, private formBuilder: FormBuilder, private localService: LocalService, private branchService: BranchService){}
  ngOnInit(): void {
    this.branchService.getAllAvailableBranches().subscribe(data => {
      this.allBranches = data;
    })
  }
  register: FormGroup = this.formBuilder.group(
    {
      brand: ['', Validators.required],
      model: ['', Validators.required],
      carBodyType: ['', Validators.required],
      year: [0, Validators.required],
      color: ['', Validators.required],
      mileage: [0, Validators.required],
      amount: [0, Validators.required],
      imageUrl: ['', Validators.required],
      branchId: ['', Validators.required]
    }
  );


  public registerNow() {
    

    const carRegister = new Car(
      -1,
      this.register.get('brand')?.value,
      this.register.get('model')?.value,
      this.register.get('carBodyType')?.value,
      this.register.get('year')?.value,
      this.register.get('color')?.value,
      this.register.get('mileage')?.value,
      this.register.get('amount')?.value,
      this.register.get('imageUrl')?.value,
      new Branch(this.register.get('branchId')?.value, '', ''),
    );

    console.log(carRegister);

    this.fleetService.createCar(carRegister).subscribe((data)=>{
      console.log("data is: ");
      console.log(data);

      this.router.navigate(['']);
    })
  }
}
