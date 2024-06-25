import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Login from '../../types/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:8080/api/auth/login";

  constructor(private http: HttpClient) { }
  

  public login(loginUser: Login) {
    const headers = new HttpHeaders({ 'X-Skip-Interceptor': '' });
    return this.http.post<any>(this.url, loginUser, {headers});
  }
}
