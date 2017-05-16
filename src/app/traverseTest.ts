export class CheckNode {
  public x: number;
  public y: number;
  public edge: boolean;
  public checked: boolean = false;

  public partner: CheckNode; //The node linked with this traverser
  public pastNode: CheckNode; //The node this node came from

  constructor (xCoord: number, yCoord: number) {
    this.x = xCoord;
    this.y = yCoord;
  }

  public getIndex(imageData, imageDepth) {
    let targetIndex = (this.y * imageData.width + this.x) * imageDepth;
    return targetIndex;
  }

  public getCoords() {
    return [this.x, this.y];
  }
}

export class Traverser {
  public nodeA: CheckNode;
  public nodeB: CheckNode;
  public pastNodeA: CheckNode;
  public pastNodeB: CheckNode;
  public nodeContrast: boolean;
  public moveVector: number[]; //This is the directions the traverser moves each check

  public imageData; //Holds the Uint8ClampedArray of pixel data as data, height, and width
  public imageDepth: number = null; // number of array values per pixel

  public constructor(imageData) {
    this.imageData = imageData;
    this.imageDepth = imageData.data.length / (imageData.width * imageData.height);
  }

  public moveNode() {

  }

  public rotateNodes() {

  }

  public traverse() {
    var borderArray = [];
    while (borderArray.length < 100) {
      this.checkNodeContrast();
      if (this.nodeContrast) {
        borderArray.push(this.nodeA.edge ? this.nodeA.getCoords : this.nodeB.getCoords);
        this.moveNode(this.nodeA);
        this.moveNode(this.nodeB);
      } else {
        this.rotateNodes();
      }
    }
  }

  public checkEdge(targetNode: CheckNode) {
    var index = targetNode.getIndex(this.imageData, this.imageDepth);
    var darkness = this.imageData.data[index] + this.imageData.data[index + 1] + this.imageData.data[index + 2];
    if (darkness > 360 || targetNode.x === 0 || targetNode.x === (this.imageData.width - 1) || targetNode.y === (this.imageData.height - 1) || targetNode.y === 0) {
      targetNode.edge = true;
    }
  }

  public checkNodeContrast() {
    this.nodeContrast = (this.nodeA.edge !== this.nodeB.edge);
  }


}
