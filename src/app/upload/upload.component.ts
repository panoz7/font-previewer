import { Component } from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  fontArrayBuffer: ArrayBuffer;

  handleFontUpload(e: Event) {
    const fontFile = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.onload = e => {
      this.fontArrayBuffer = e.target.result as ArrayBuffer;
    }

    reader.readAsArrayBuffer(fontFile);

  }





}
