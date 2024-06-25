import { Component, OnInit } from '@angular/core';
import Car from '../../types/car';
import { FleetService } from './fleet.service';
import { CarCardComponent } from '../../car-card/car-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [MatGridListModule, CarCardComponent],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css',
})
export class FleetComponent implements OnInit {
  allCars: Car[] = [];

  ngOnInit(): void {
    this.fleetService.getAllAvailableCars().subscribe((data) => {
      this.allCars = data;
    });
  }

  constructor(private fleetService: FleetService) {}
}
