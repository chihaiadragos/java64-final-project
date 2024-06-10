import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Branch from '../types/branch';
import UpdateStatus from '../types/updateStatus';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private url = "http://localhost:8080/branch";
  private url2 = "http://localhost:8080/branch/update";

  constructor(private http: HttpClient) { }

  public getBranchById(id: number) {
    return this.http.get<Branch>(this.url + '/' + id);
  }

  public getAllBranches() {
    return this.http.get<Branch[]>(this.url);
  }
  public getAllAvailableBranches() {
    return this.http.get<Branch[]>(this.url + '/available');
  }

  public createBranch(branch: Branch) {
    return this.http.post<Branch>(this.url + '/create', branch);
  }
  public deleteBranch(updateStatus: UpdateStatus) {
    return this.http.put<any>(this.url2, updateStatus);
  }
}
