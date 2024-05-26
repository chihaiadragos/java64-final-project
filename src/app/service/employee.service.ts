import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "http://localhost:8080/employees";

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<any>(this.url);
  }
}