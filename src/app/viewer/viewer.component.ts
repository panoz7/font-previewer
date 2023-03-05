import { Component, Input, OnInit } from '@angular/core';
import opentype from 'opentype.js'

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  
  @Input('fontArrayBuffer') fontArrayBuffer: ArrayBuffer;
  fontInfo;
  fontFaceLoaded = false;
  fontFamily: string;
  axes: any;

  ngOnInit() {

  }

  ngOnChanges() {
    this.fontInfo = this.getFontData(this.fontArrayBuffer);
    this.genFontFace();
  }

  getFontData(fontArrayBuffer: ArrayBuffer) {
    return opentype.parse(fontArrayBuffer);
  }

  async genFontFace() {
    this.fontFamily = this.fontInfo.names.fontFamily.en;
    const descriptors = {} as any;
    
    // Get the axes
    this.axes = this.fontInfo.tables.fvar.axes;

    for (let axis of this.axes) {
      if (axis.tag == 'wght') {
        descriptors.weight = `${axis.minValue} ${axis.maxValue}`
      }

      if (axis.tag == 'wdth') {
        descriptors.stretch = `${axis.minValue}% ${axis.maxValue}%`
      }
    }

    // Build the font face, load the font, add it to the document
    const fontFace = new FontFace(this.fontFamily, this.fontArrayBuffer, descriptors);
    await fontFace.load();
    (document as any).fonts.add(fontFace);

    console.log(fontFace);

    this.fontFaceLoaded = true;


  }





}
