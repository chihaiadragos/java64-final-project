import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Car from '../../types/car';
import Period from '../../types/period';
import Banana from '../../types/newcar';
import UpdateStatus from '../../types/updateStatus';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  private url = "http://localhost:8080/car";
  private url2 = "http://localhost:8080/car/update";
  private url3 = "http://localhost:8080/car/availablecarsduringperiod";
  private url4 = "http://localhost:8080/car/create";
  private url5 = "http://localhost:8080/car/availablecars";

  constructor(private http: HttpClient) { }

  public getAllCars() {
    return this.http.get<Car[]>(this.url);
  }

  public getAllAvailableCars() {
    return this.http.get<Car[]>(this.url5);
  }

  public getCarById(id: number) {
    return this.http.get<Car>(this.url + '/' + id);
  }

  public updateCar(car: Car) {
    console.log(car);
    console.log(this.url2)
    return this.http.put<Car>(this.url2, car);
  } 

  public deleteCar(updateStatus: UpdateStatus) {
    return this.http.put<any>(this.url2, updateStatus);
  } 

  public createCar(car: Banana) {
    return this.http.post<Banana>(this.url4, car);
  } 

  public availableCarsDuringPeriord(per: Period){
    return this.http.post<Car[]>(this.url3, per);
  }
}
