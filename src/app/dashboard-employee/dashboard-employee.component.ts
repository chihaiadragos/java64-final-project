import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import Customer from '../types/customer';
import { CustomerService } from '../service/customer.service';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import Amount from '../types/amount';


@Component({
  selector: 'app-dashboard-employee',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatIconModule, MatDialogActions, MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard-employee.component.html',
  styleUrl: './dashboard-employee.component.css',
})
export class DashboardEmployeeComponent implements OnInit {
  userId: number = 1;
  customer!: Customer;
  customerForm: FormGroup;

  constructor(
    private router: Router, 
    private localService: LocalService, 
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.customerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
      })
    }

  balance!: number;

  url = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

  onselectFile(e: any) {
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=> {
        this.url=event.target.result;
      }
    }
  }



  ngOnInit(): void {
    const currentUserString = this.localService.getData("currentUser");
    if(currentUserString){
      const currentUser = JSON.parse(currentUserString);
      const someid = currentUser.id;
      console.log(someid);
      this.userId = someid;
    }
    console.log(this.userId);
    this.customerService.getCustomerByUserId(this.userId).subscribe((result) => {

      console.log(result);
      this.customer = result;
      this.balance = this.customer.balance;

      this.customerForm.patchValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email,
        address: this.customer.address
      });
    })
  }

  public onSubmit() {
    if(this.customerForm.valid) {
      const formValues = this.customerForm.value;
      const updatedCustomer: Customer = {
        id: this.customer.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        address: formValues.address,
        image: null,
        balance: this.balance
      };
      console.log(updatedCustomer);
      this.customerService.updateCustomer(updatedCustomer).subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      })
    }
  }

  public addMoney() {
    console.log("here");
    const amount: Amount = new Amount(1000);
    this.customerService.addMoney(amount, this.customer.id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }
}
