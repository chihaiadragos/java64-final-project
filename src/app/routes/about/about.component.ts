import { Component } from '@angular/core';

interface Testimonial {
  image: string;
  message: string;
  name: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
