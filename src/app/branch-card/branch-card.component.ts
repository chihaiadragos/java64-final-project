import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import UpdateStatus from '../types/updateStatus';
import { BranchService } from '../service/branch.service';

@Component({
  selector: 'app-branch-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './branch-card.component.html',
  styleUrl: './branch-card.component.css'
})
export class BranchCardComponent {
  constructor(private router: Router, private branchService: BranchService) {}
  
  @Input() id: number = 0;
  @Input() city: String = "";
  @Input() address: String = "";

  public update() {
    //!!!!!!!!!!!!!! check route
    this.router.navigate(['update-branch']);
  }
  public delete() {
    //!!!!!!!!!!!!!! check route
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // this.fleetService.deleteCar(new UpdateStatus(this.carId, "UNAVAILABLE")).subscribe(data => {}
        this.branchService.deleteBranch(new UpdateStatus(this.id, "UNAVAILABLE")).subscribe(data => {
          console.log(data);
        })
        Swal.fire({
          title: "Deleted!",
          text: "Branch has been deleted.",
          icon: "success"
        });
      }
    });
    
  }
}