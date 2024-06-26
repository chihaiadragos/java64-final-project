import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Reservation from '../types/reservation';
import ReservationForm from '../types/reservationForm';
import UpdateStatus from '../types/updateStatus';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url = "http://localhost:8080/reservation/create";
  private url2 = "http://localhost:8080/reservation";
  private url3 = "http://localhost:8080/reservation/getByCustomerId/";
  private url4 = "http://localhost:8080/reservation/update";

  constructor(private http: HttpClient) { }

  public createReservation(reservation: Reservation) {
    return this.http.post<any>(this.url, reservation);
  }

  public getAllReservations() {
    return this.http.get<ReservationForm[]>(this.url2);
  }

  public getAllReservationsByCustomerId(id: number) {
    return this.http.get<ReservationForm[]>(this.url3 + id);
  }

  public updateReservation(updateStatus: UpdateStatus) {
    return this.http.put(this.url4, updateStatus);
  }
}
