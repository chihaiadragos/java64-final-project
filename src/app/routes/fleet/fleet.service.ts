import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Car from '../../types/car';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  private url = "http://localhost:8080/car";
  private url2 = "http://localhost:8080/car/update";

  constructor(private http: HttpClient) { }

  public getAllCars() {
    return this.http.get<Car[]>(this.url);
  }

  public getCarById(id: number) {
    return this.http.get<Car>(this.url + '/' + id);
  }

  public updateCar(car: Car) {
    console.log(car);
    console.log(this.url2)
    return this.http.put<Car>(this.url2, car)
  } 
}
