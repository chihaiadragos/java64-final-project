import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Car from '../../types/car';
import Period from '../../types/period';
import Banana from '../../types/newcar';
import UpdateStatus from '../../types/updateStatus';
import { LocalService } from '../../login/service/local.service';

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
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': '' });
    return this.http.get<Car[]>(this.url, {headers});
  }

  public getAllAvailableCars() {

    //Avoided this code repetition with Interceptor
    // const currentUserString = this.localService.getData('currentUser');
    // const currentUser = JSON.parse(currentUserString!);
    // const headers = new HttpHeaders({
    //   "Authorization": `Bearer ${currentUser.token}`
    // })

    const headers = new HttpHeaders({ 'X-Skip-Interceptor': '' });
    return this.http.get<Car[]>(this.url5, {headers});
  }

  public getCarById(id: number) {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': '' });
    return this.http.get<Car>(this.url + '/' + id, {headers});
  }

  public updateCar(car: Car) {

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
