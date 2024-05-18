import { Component, OnInit } from '@angular/core';
import Car from '../../types/car';
import { FleetService } from './fleet.service';
import { CarCardComponent } from '../../car-card/car-card.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [MatGridListModule, CarCardComponent],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css'
})
export class FleetComponent implements OnInit{

  allCars: Car[] = [];
  defaultImage = "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20_Modelpc.png";

  ngOnInit(): void {
    this.fleetService.getAllCars().subscribe((data) => {
      this.allCars = data;
      this.allCars.forEach((element) => {
        element.imageUrl = this.defaultImage;
      })
      console.log(data);
    })
  }

  constructor(private fleetService: FleetService) {}
}
