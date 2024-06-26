import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  callNow() {
    let dotCount = 1;
    const maxDots = 3;
    Swal.fire({
      title: 'Calling..',
      width: 400,
      padding: '3em',
      color: '#716add',
      background: '#fff url()',
      confirmButtonText: 'Hang up',
      didOpen: () => {
        const titleElement = Swal.getTitle();
        const interval = setInterval(() => {
          if (titleElement) {
            titleElement.textContent = `Calling${'.'.repeat(dotCount)}`;
            dotCount = dotCount < maxDots ? dotCount + 1 : 1;
          }
        }, 500);
        Swal.getPopup()!.addEventListener('close', () => {
          clearInterval(interval);
        });
        const swalContainer = document.querySelector('.swal2-container');
        if (swalContainer) {
          const img = document.createElement('img');
          img.src = './assets/Wc8C.gif';
          img.style.position = 'absolute';
          img.style.top = '20px';
          img.style.left = '20px';
          img.style.width = '100px';
          img.style.height = '100px';
          swalContainer.appendChild(img);
        }
      },
    });
  }

  async request() {
    const { value: email } = await Swal.fire({
      title: 'Please enter your email address',
      input: 'email',
      inputPlaceholder: 'Enter your email address',
    });
    if (email) {
      Swal.fire(`Entered email: ${email}`);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Request sent successfully',
      });
    }
  }
}
