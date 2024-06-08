import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
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

  period!: Period;
  periodLength: number | null = null;
  startString: string = '';
  endString: string = '';
  cars: Car[] = [];

  constructor(private fleetService: FleetService) {}
  // periodForm: FormGroup;

  // constructor(
  //   private formBuilder: FormBuilder,
  //   this.periodForm = this.formBuilder.group({
  //     startDate: ['', Validators.required],
  //     endDate: ['', Validators.required]
  //   })
  // )


  ngOnInit(): void {
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
    // 
    

    
    this.period = new Period(this.startString, this.endString);
    console.log(this.period);

    const anotherPeriod: Period = {
      startDate: this.startString,
      endDate: this.endString
    }

    this.fleetService.availableCarsDuringPeriord(anotherPeriod).subscribe((data) => {
      console.log(data);
    })
  }
}
