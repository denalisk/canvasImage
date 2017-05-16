import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas-test',
  templateUrl: './canvas-test.component.html',
  styleUrls: ['./canvas-test.component.css']
})

export class CanvasTestComponent implements OnInit {
  public targetImage = new Image();
  public imageHeight: number;
  public imageWidth: number;
  public pCanvas = null;
  public ctx = null;
  public imgDataUrl = null;

  constructor() {
    this.targetImage.src = "../../assets/images/tile.jpg";
    this.targetImage.alt = "a pic";
    this.debugLog();
   }

  ngOnInit() {
    this.imageHeight = this.targetImage.height;
    this.imageWidth = this.targetImage.width;
    this.pCanvas = document.getElementById("myCanvas");
    this.ctx = this.pCanvas.getContext("2d");
  }

  public getPixelData(image) {
    var myCanvas = this.createCanvas(image.width, image.height);
    var ctx = myCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0,0, myCanvas.width, myCanvas.height);
  }

  public createCanvas(x: number, y: number) {
    var newCanvas = document.createElement('canvas');
    newCanvas.width = x;
    newCanvas.height = y;
    return newCanvas;
  }

  public logPixelData() {
    let logData = this.getPixelData(this.targetImage);
    console.log(logData);
  }

  public debugLog() {
    console.log("Target image is :");
    console.log(this.targetImage);
    console.log("Current global height is " + this.imageHeight + " and current total width is " + this.imageWidth);
    console.log("<<>>");
    console.log("The current canvas is: ");
    console.log(this.pCanvas);
  }

  public loadImage() {
    this.ctx.drawImage(this.targetImage, 0, 0);
  }

  public invert(data, canvasContext) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    canvasContext.putImageData(data, 0, 0);
  }

}
//
// export class CanvasTestComponent implements OnInit {
//   public imageSrc = "../../assets/images/tile.jpg";
//   public imageAlt = "an image of a tile";
//   public myCanvas;
//   public canvasCtx;
//   // public targetImage;
//
//   public height: number;
//   public width: number;
//
//   constructor() { }
//
//   ngOnInit() {
//     this.myCanvas = <HTMLCanvasElement>document.getElementById("myCanvas");
//     this.canvasCtx = this.myCanvas.getContext("2d");
//     var newImage = new Image();
//     newImage.src = this.imageSrc;
//     newImage.alt = this.imageAlt;
//     console.log(newImage);
//     this.canvasCtx.drawImage(newImage, 0, 0);
//   }
//
//   public setXY(x: number, y: number): void {
//     this.width = x;
//     this.height = y;
//   }
//
// }
