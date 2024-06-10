import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CarCardComponent } from '../car-card/car-card.component';
import Branch from '../types/branch';
import { BranchService } from '../service/branch.service';
import { BranchCardComponent } from "../branch-card/branch-card.component";

@Component({
    selector: 'app-branches',
    standalone: true,
    templateUrl: './branches.component.html',
    styleUrl: './branches.component.css',
    imports: [MatGridListModule, CarCardComponent, BranchCardComponent]
})
export class BranchesComponent implements OnInit{
  allBranches: Branch[] = [];
  ngOnInit(): void {
    this.branchService.getAllAvailableBranches().subscribe(data => {
      this.allBranches = data;
    })
  }
  constructor(private branchService: BranchService) {}

}
