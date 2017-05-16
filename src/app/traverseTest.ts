export class CheckNode {
  public x: number;
  public y: number;
  public edge: boolean;
  public checked: boolean = false;


  constructor (xCoord: number, yCoord: number) {
    this.x = xCoord;
    this.y = yCoord;
  }

  public getIndex(imageData, imageDepth) {
    let targetIndex = (this.y * imageData.width + this.x) * imageDepth;
    return targetIndex;
  }
}

export class Traverser {
  public nodeA: CheckNode;
  public nodeB: CheckNode;
  public pastNodeA: CheckNode;
  public pastNodeB: CheckNode;

  public imageData; //Holds the Uint8ClampedArray of pixel data as data, height, and width
  public imageDepth: number = null; // number of array values per pixel

  public constructor(imageData) {
    this.imageData = imageData;
    this.imageDepth = imageData.data.length / (imageData.width * imageData.height);
  }

  public move() {

  }

  public rotate() {

  }

  public check() {
    var indexA = this.nodeA.getIndex(this.imageData, this.imageDepth);
    var indexB = this.nodeB.getIndex(this.imageData, this.imageDepth);

  }




}
