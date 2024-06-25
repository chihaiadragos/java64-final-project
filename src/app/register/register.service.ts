import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RegisterClient from '../types/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = "http://localhost:8080/api/auth/register";

  constructor(private http: HttpClient) { }

  public register(registerClient: RegisterClient) {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': '' });
    return this.http.post<any>(this.url, registerClient, {headers});
  }
}
