import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Branch from '../types/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private url = "http://localhost:8080/branch";

  constructor(private http: HttpClient) { }

  public getBranchById(id: number) {
    return this.http.get<Branch>(this.url + '/' + id);
  }
  public getAllBranches() {
    return this.http.get<Branch[]>(this.url);
  }
}
