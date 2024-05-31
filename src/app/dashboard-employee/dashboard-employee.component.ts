import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-dashboard-employee',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './dashboard-employee.component.html',
  styleUrl: './dashboard-employee.component.css',
})
export class DashboardEmployeeComponent implements OnInit {

  balance: number = 1000;

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

  constructor(private router: Router, private localService: LocalService) {}

  ngOnInit(): void {}
}
