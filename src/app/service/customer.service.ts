import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Customer from '../types/customer';
import Amount from '../types/amount';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = "http://localhost:8080/customer";
  private url2 = "http://localhost:8080/customer/update";
  private url3 = "http://localhost:8080/customer/updateimage/";

  constructor(private http: HttpClient) { }

  public getCustomerByUserId(id: number) {
    return this.http.get<any>(this.url + '/userid/' + id);
  }

  public updateCustomer(customer: Customer) {
    return this.http.put<Customer>(this.url2, customer);
  }

  public addMoney(amount: Amount, id: number) {
    return this.http.put<any>(this.url + '/' + id + '/addMoney', amount);
  }
  public getCustomerImage(customerId: number): Observable<Blob> {
    return this.http.get(`${this.url}/${customerId}/image`, { responseType: 'blob' });
  }
  public uploadCustomerImage(customerId:number,  formData: FormData): Observable<any> {
    return this.http.post(this.url3 + customerId, formData);
  }
}