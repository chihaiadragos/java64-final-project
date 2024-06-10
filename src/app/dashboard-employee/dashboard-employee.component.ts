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

import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import Amount from '../types/amount';
import { CustomerService } from '../service/customer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard-employee',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule,
    ReactiveFormsModule,
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
    private formBuilder: FormBuilder
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  balance!: number;

  url =
    'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg';

  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  ngOnInit(): void {
    const currentUserString = this.localService.getData('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const someid = currentUser.id;
      console.log(someid);
      this.userId = someid;
    }
    console.log(this.userId);
    this.customerService
      .getCustomerByUserId(this.userId)
      .subscribe((result: Customer) => {
        console.log(result);
        this.customer = result;
        this.balance = this.customer.balance;

        this.customerForm.patchValue({
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          email: this.customer.email,
          address: this.customer.address,
        });
      });
  }

  public onSubmit() {

    Swal.fire({
      title: "Do you want to save the changes?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      // denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.customerForm.valid) {
          const formValues = this.customerForm.value;
          const updatedCustomer: Customer = {
            id: this.customer.id,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            address: formValues.address,
            image: null,
            balance: this.balance,
          };
          this.customerService
            .updateCustomer(updatedCustomer)
            .subscribe((result: any) => {
              console.log(result);
              this.ngOnInit();
            });
        }
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });


  }

  public async addMoney() {

    const ipAPI = '//api.ipify.org?format=json';
    const response = await fetch(ipAPI);
    const data = await response.json();
    const inputValue = data.ip;
    const { value: balance } = await Swal.fire({
      title: 'Enter amount',
      input: 'number',
      // inputLabel: 'Your balance',
      inputValue,
      showCancelButton: true,
    });
    if (balance) {
      const balanceNumber = Number(balance);
      this.customerService
      .addMoney(new Amount(balanceNumber), this.customer.id)
      .subscribe((result: any) => {
        console.log(result);
        this.ngOnInit();
      });
      Swal.fire(`You add ${balance}$ to your account`);
    }
    // const amount: Amount = new Amount(1000);
    // this.customerService
    //   .addMoney(amount, this.customer.id)
    //   .subscribe((result: any) => {
    //     console.log(result);
    //     this.ngOnInit();
    //   });
  }
}
