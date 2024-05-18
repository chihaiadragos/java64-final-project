import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})
export class CarCardComponent {
  @Input() id: number = 0;
  @Input() brand: String = "";
  @Input() model: String = "";
  @Input() carBodyType: String = "";
  @Input() year: number = 0;
  @Input() color: String = "";
  @Input() mileage: number = 0;
  @Input() amount: number = 0;
  @Input() imageUrl: String = "";

  constructor(private router: Router) {}

  public showDetails() {
    this.router.navigate([`car/${this.id}`])
    
  }
}
