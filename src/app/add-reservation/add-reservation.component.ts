import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { JsonPipe } from '@angular/common';
import { FleetComponent } from '../routes/fleet/fleet.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import Period from '../types/period';
import Car from '../types/car';
import { FleetService } from '../routes/fleet/fleet.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { CarCardComponent } from '../car-card/car-card.component';
import { LocalService } from '../login/service/local.service';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatGridListModule, 
    CarCardComponent,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    ReactiveFormsModule, 
    JsonPipe,
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
  ],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.css'
})
export class AddReservationComponent implements OnInit{
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  breakpoint: number = 3;
  period!: Period;
  periodLength: number | null = null;
  startString: string = '';
  endString: string = '';
  cars: Car[] = [];

  constructor(private fleetService: FleetService, private localService: LocalService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {


    this.setBreakpoint(window.innerWidth);
  
    this.fleetService.getAllAvailableCars().subscribe((data) => {
      this.cars = data;

    })

    this.range.valueChanges.subscribe(value => {
      this.startString = value.start ? value.start.toISOString() : '';
      this.startString = this.startString?.slice(0, 10);
      this.endString = value.end ? value.end.toISOString() : '';
      this.endString = this.endString?.slice(0, 10);
    })
  }
  public filterByPeriod() {
    console.log("filter");
    console.log(this.range);




    console.log("-----------------------")

    console.log('Start Date:', this.startString);
    console.log('End Date:', this.endString);

  }
  setBreakpoint(width: number) {
    this.breakpoint = (width <= 920) ? 1 : (width <= 1350) ? 2 : 3;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setBreakpoint(event.target.innerWidth);
  }
  onSubmit() {
    console.log('Start Date:', this.startString);
    console.log('End Date:', this.endString);

    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    // for counting period of days length
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      this.periodLength = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      console.log(`Period length: ${this.periodLength} days`);
    } else {
      this.periodLength = null;
      console.error('Invalid date range');
    }
    
    this.localService.saveData('PeriodData', JSON.stringify({
      start: this.startString,
      end: this.endString,
      length: this.periodLength
    }));
    


    
    this.period = new Period(this.startString, this.endString);
    console.log(this.period);

    const anotherPeriod: Period = {
      startDate: this.startString,
      endDate: this.endString
    }

    this.fleetService.availableCarsDuringPeriord(anotherPeriod).subscribe((data) => {
      this.cars = data;

    })
  }
}
