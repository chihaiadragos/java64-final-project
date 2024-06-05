import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalService } from '../login/service/local.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule,MatGridListModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(private router: Router, private localService: LocalService) { }
}
