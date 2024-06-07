import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import RegisterClient from '../types/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  accountType: string = "CLIENT";

  constructor(private router: Router, private registerService: RegisterService, private formBuilder: FormBuilder, private localService: LocalService){}


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
