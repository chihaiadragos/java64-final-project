import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  name: string = '';
  file: any;

  constructor(private http: HttpClient) {}

  getName(name: string) {
    this.name = name;
  }

  getFile(event: any) {
    this.file = event.target.files[0];
    console.log("file", this.file);
  }

  submitData() {
    let formData = new FormData();
    formData.set('id', this.name);
    formData.set('file', this.file);

    this.http.post('http://localhost:8080/customer/updateimage/3', formData).subscribe(response => {
      console.log(response);
    });
  }

}
