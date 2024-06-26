import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, MatGridListModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router){}
  beginSearch() {
    this.router.navigate(['/fleet']);
  }
}
