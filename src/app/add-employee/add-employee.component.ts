import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { RegisterService } from '../register/register.service';
import RegisterClient from '../types/register';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BranchService } from '../service/branch.service';
import Branch from '../types/branch';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  accountType: string = "ADMIN";
  allBranches: Branch[] = [];
  
  constructor(private router: Router, private registerService: RegisterService, private formBuilder: FormBuilder, private localService: LocalService, private branchService: BranchService){}
  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe(data => {
      this.allBranches = data;
    })
  }


  register: FormGroup = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      branch: ['', Validators.required]
    }
  );


  public registerNow() {

    const clientRegister = new RegisterClient(
      this.register.get('firstName')?.value,
      this.register.get('lastName')?.value,
      this.register.get('address')?.value,
      this.register.get('email')?.value,
      this.register.get('password')?.value,
      this.register.get('branch')?.value,
      this.accountType
    );

    console.log(clientRegister);

    this.registerService.register(clientRegister).subscribe((data)=>{
      console.log("data is: ");
      console.log(data);

      this.router.navigate(['']);
    })
  }
}
