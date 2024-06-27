import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { BranchService } from '../service/branch.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import Branch from '../types/branch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-branch',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css',
})
export class AddBranchComponent {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private localService: LocalService,
    private branchService: BranchService
  ) {}

  register: FormGroup = this.formBuilder.group({
    city: ['', Validators.required],
    address: ['', Validators.required],
  });

  public registerNow() {
    const branchRegister = new Branch(
      -1,
      this.register.get('city')?.value,
      this.register.get('address')?.value
    );

    console.log(branchRegister);

    this.branchService.createBranch(branchRegister).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'New branch successfully added',
          showConfirmButton: false,
          timer: 3500,
        });

        this.register.reset();
        this.router.navigate(['test']);
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Branch already exist',
          showConfirmButton: false,
          timer: 4000,
        });
      }
    );
  }
}
