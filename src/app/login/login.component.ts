import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import Login from '../types/login';
import { LocalService } from './service/local.service';
import { Router } from '@angular/router';

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
    console.log(userLogin);
    this.loginService.login(userLogin).subscribe((data)=>{
      console.log(data);
      this.localService.saveData("currentUser", JSON.stringify({
        id: data.id,
        fullName: data.fullName,
        accountType: data.accountType,
        token: data.token
      }));
      this.router.navigate(['']);
      console.log(data);
    })
 
  }

  
}
