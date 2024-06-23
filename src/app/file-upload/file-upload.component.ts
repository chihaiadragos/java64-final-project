import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit{
  name: string = '';
  file: any;
  customerImage: string | null = null;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/customer/304/image', { responseType: 'text' })
    .subscribe(
      data => this.customerImage = 'data:image/png;base64,' + data,
      error => console.error(error)
    );
  }

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

    this.http.post('http://localhost:8080/customer/updateimage/12', formData).subscribe(response => {
      console.log(response);
    });
  }

}
