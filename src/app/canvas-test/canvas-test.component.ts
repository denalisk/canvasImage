import { Component, OnInit } from '@angular/core';
import { Traverser, CheckNode } from './../traverseTest';

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

  // Test values
  public starterXCoord: number = 20;
  public starterYCoord: number = 20;

  constructor() {
    this.targetImage.src = "../../assets/images/tile.jpg";
    this.targetImage.alt = "a pic";
   }

  ngOnInit() {
    this.imageHeight = this.targetImage.height;
    this.imageWidth = this.targetImage.width;
    this.pCanvas = document.getElementById("myCanvas");
    this.ctx = this.pCanvas.getContext("2d");
  }

  public getPixelData(image) {
    // Returns the image data object by creating a canvas and calling getImageData
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

  public debugLog(event) {
    // console.log("Target image is :");
    // console.log(this.targetImage);
    // console.log("Current global height is " + this.imageHeight + " and current total width is " + this.imageWidth);

    // console.log("<<>>");
    // console.log("The current canvas is: ");
    // console.log(this.pCanvas);

    // console.log("Current mouse position");
    // console.log(this.getMousePosition(event));

    let logData = this.getPixelData(this.targetImage);
    var testConnection = new Traverser(logData);
    testConnection.tester();
  }

  public loadImage() {
    this.ctx.drawImage(this.targetImage, 0, 0);
  }

  public invert(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255 - imageData.data[i];
      imageData.data[i + 1] = 255 - imageData.data[i + 1];
      imageData.data[i + 2] = 255 -  imageData.data[i + 2];
    }
    return imageData;
  }

  public checkDarkness(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
      let r = imageData.data[i];
      let g = imageData.data[i + 1];
      let b = imageData.data[i + 2];
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = ((r+g+b) > 650) ? 0 : 255;
    }
    return imageData;
  }

  public applyFilter(filter, image, context) {
    var imageData = this.getPixelData(image);
    imageData = filter(imageData);
    context.putImageData(imageData, 0, 0);
  }

  public getMousePosition(event) {
    let rectangle = this.pCanvas.getBoundingClientRect();
    return {
      x: event.clientX - (rectangle.left + 1),
      y: event.clientY - (rectangle.top + 1)
    };
  }

  public canvasClick(event) {
    var coords = this.getMousePosition(event);
    this.drawRectangle(coords.x, coords.y, this.ctx);
  }

  public drawRectangle(x: number, y: number, canvasContext): void {
    canvasContext.beginPath();
    canvasContext.rect(x, y, 10, 10);
    canvasContext.fillStyle = "red";
    canvasContext.fill();
    canvasContext.closePath();
  }

  public runTraverse() {
    var newData = this.getPixelData(this.targetImage);
    var traverser = new Traverser(newData);
    traverser.findEdge([this.starterXCoord, this.starterYCoord]);
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
