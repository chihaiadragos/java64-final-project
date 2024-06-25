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
import UpdateStatus from '../../types/updateStatus';
import Swal from 'sweetalert2';






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
  imageUrl: string = '';
  type: string = "";
  user: any;

  constructor(private fleetService: FleetService, private route: ActivatedRoute, private router: Router, private localService: LocalService) {}

  ngOnInit() {

    const currentUserString = this.localService.getData("currentUser");
    if (currentUserString) {

      const currentUser = JSON.parse(currentUserString);

      this.type = currentUser.accountType;
    }

    this.imageUrl = history.state.imageUrl || '';
    this.fleetService.getCarById(this.carId).subscribe((result) => {
      this.car = result;
      console.log(result);
    })

  }
  public isAdmin() {
    return this.type === 'ADMIN';
  }
  public isLoggedIn() {
  
    if (this.localService.getData("currentUser")){
      this.user = JSON.parse(this.localService.getData("currentUser")!);
      return true;
    } else {
      return false;
    }
  }

  public gotoUpdate() {
    this.router.navigate([`/update/${this.carId}`]);
  }
  public bookNow() {
      console.log(this.car.id);
      console.log(this.car.branch?.id);

      this.localService.saveData('currentReservation', JSON.stringify({
        carId: this.car.id,
        carBranchId: this.car.branch?.id
      }));
      this.router.navigate([`book-reservation`]);
  }

  public deleteCar() {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.fleetService.deleteCar(new UpdateStatus(this.carId, "UNAVAILABLE")).subscribe(data => {
      
        })
        this.router.navigate([`fleet`]);
        Swal.fire({
          title: "Deleted!",
          text: "Car has been deleted.",
          icon: "success"
        });
      }
    });

  }
}
