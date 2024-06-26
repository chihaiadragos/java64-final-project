import { Component, HostListener, OnInit } from '@angular/core';
import Car from '../../types/car';
import { FleetService } from './fleet.service';
import { CarCardComponent } from '../../car-card/car-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LocalService } from '../../login/service/local.service';


@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [MatGridListModule, CarCardComponent],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css',
})
export class FleetComponent implements OnInit {
  breakpoint: number = 3;
  allAvailableCars: Car[] = [];
  allCars: Car[] = [];
  type: string = '';

  ngOnInit(): void {

    this.setBreakpoint(window.innerWidth);


    const currentUserString = this.localService.getData("currentUser");
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.type = currentUser.accountType;
    }


    this.fleetService.getAllAvailableCars().subscribe((data) => {
      this.allAvailableCars = data;
    });
    this.fleetService.getAllCars().subscribe((data) => {
      this.allCars = data;
      console.log(data);
      

    });
  }
  setBreakpoint(width: number) {
    this.breakpoint = (width <= 920) ? 1 : (width <= 1350) ? 2 : 3;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setBreakpoint(event.target.innerWidth);
  }
  public isAdmin() {
    return this.type === 'ADMIN';
  }
  constructor(private fleetService: FleetService, private localService: LocalService) {}
}
