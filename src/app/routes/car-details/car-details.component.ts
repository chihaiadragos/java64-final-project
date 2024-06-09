import { Component, OnInit } from '@angular/core';
import { FleetService } from '../fleet/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';
import Car from '../../types/car';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalService } from '../../login/service/local.service';




@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatCardModule, MatGridListModule, CommonModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit{

  carId = Number(this.route.snapshot.params['id']);
  car: Car = new Car();
  defaultImage = "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20_Modelpc.png";


  constructor(private fleetService: FleetService, private route: ActivatedRoute, private router: Router, private localService: LocalService) {}

  ngOnInit() {
    this.fleetService.getCarById(this.carId).subscribe((result) => {
      this.car = result;
      console.log(result);
    })

  }

  public gotoUpdate() {
    this.router.navigate([`/update/${this.carId}`]);
  }
  public bookNow() {

    // if (this.car) {
      console.log(this.car.id);
      console.log(this.car.branch?.id);

      this.localService.saveData('currentReservation', JSON.stringify({
        carId: this.car.id,
        carBranchId: this.car.branch?.id
      }));
      this.router.navigate([`book-reservation`]);
  // }
  }
}
