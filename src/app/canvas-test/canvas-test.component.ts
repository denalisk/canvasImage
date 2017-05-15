import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas-test',
  templateUrl: './canvas-test.component.html',
  styleUrls: ['./canvas-test.component.css']
})
export class CanvasTestComponent implements OnInit {
  public targetImage = new Image();

  constructor() { }

  ngOnInit() {
    this.targetImage.src = "../../assets/images/tile.jpg",
    this.targetImage.alt = "a pic";
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
