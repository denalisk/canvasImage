import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  public myCanvas = null;
  public ctx = null;

  public height: number;
  public width: number;

  public image = new Image();
  public imageSrc: string = "../../assets/images/tile.jpg";

  constructor() { }

  ngOnInit() {
    this.myCanvas = document.getElementById("image-processor");
    this.ctx = this.myCanvas.getContext("2d");
    this.image.src = this.imageSrc;
    this.placeImage(this.image);
  }

  public setCanvasDimensions(x: number, y: number): void {
    this.width = x;
    this.height = y;
  }

  public placeImage(myImage): void {
    this.ctx.drawImage(myImage, 0, 0);
    console.log(myImage.width);
    this.setCanvasDimensions(myImage.width, myImage.height);
  }

  public drawRectangle(x: number, y: number, canvas): void {
    canvas.beginPath();
    canvas.rect(x, y, 10, 10);
    canvas.fillStyle = "red";
    canvas.fill();
    canvas.closePath();
  }

  public canvasClick(event): void {
    var currentX = event.pageX - this.width;
    var currentY = event.pageY;
    console.log("X is " + currentX + " and y is " + currentY);
    console.log("You clicked it");
    console.log(this);
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



















// ================================================
