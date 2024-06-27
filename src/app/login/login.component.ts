import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import Login from '../types/login';
import { LocalService } from './service/local.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder, private localService: LocalService){}

   login: FormGroup = this.formBuilder.group(
    {
      email: ['', Validators.required],
      password: ['', Validators.required]

    }
  );

  public loginNow(){
    const userLogin = new Login(this.login.get('email')?.value, this.login.get('password')?.value);
    this.loginService.login(userLogin).subscribe((data)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logging in!',
        showConfirmButton: false,
        timer: 3500,
      });
      console.log(data);
      this.localService.saveData("currentUser", JSON.stringify({
        id: data.id,
        fullName: data.fullName,
        accountType: data.accountType,
        token: data.token
      }));
      this.router.navigate(['']);
      
    },(error) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid request',
        showConfirmButton: false,
        timer: 4000,
      });
    })
  }

  
}


