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

  public cloneNode() {
    var newNode = new CheckNode(this.x, this.y);
    newNode.edge = this.edge;
    return newNode;
  }
}

export class Traverser {
  public nodeA: CheckNode;
  public nodeB: CheckNode;
  public nodeContrast: boolean;
  public cutoff: number = 650;

  public moveVector: number[]; //This is the directions the traverser moves each check

  public imageData; //Holds the Uint8ClampedArray of pixel data as data, height, and width
  public imageDepth: number = null; // number of array values per pixel

  public constructor(imageData) {
    this.imageData = imageData;
    this.imageDepth = imageData.data.length / (imageData.width * imageData.height);
  }

  public moveNode(targetNode: CheckNode) {
    targetNode.pastNode = targetNode.cloneNode();
    targetNode.x += this.moveVector[0];
    targetNode.y += this.moveVector[1];
    this.checkEdge(targetNode);
  }

  public rotateNodes() {
    // Rotates the traverser. Anchors off the current unique node and switches
    // direction based on that
    console.log("Inside rotateNodes");
    console.log(this.nodeA);
    console.log(this.nodeB);
    var anchorNode = (this.nodeA.edge === this.nodeA.pastNode.edge) ? this.nodeB : this.nodeA;
    console.log(anchorNode);
    this.moveVector = [(anchorNode.x - anchorNode.partner.x), (anchorNode.y-anchorNode.partner.y)];
    this.nodeA = anchorNode;
    this.nodeB = anchorNode.pastNode;
  }

  public traverse() {
    // This is the main node checker loop
    // It holds the array of border elements as borderArray. Each iteration, it
    // sets the node Contrast and that determines whether the current edge node
    // gets pushed to the borderArray (as the next border point) or if the
    // traverser gets rotated
    var borderArray = [];
    borderArray.push((this.nodeA.edge === true) ? this.nodeA : this.nodeB);
    while (borderArray.length < 100) {
      console.log("while loop stage 1");
      console.log(borderArray.length);
      this.checkNodeContrast();
      if (this.nodeContrast) {
        borderArray.push(this.nodeA.edge ? this.nodeA.getCoords : this.nodeB.getCoords);
        this.moveNode(this.nodeA);
        this.moveNode(this.nodeB);
      } else {
        this.rotateNodes();
      }
    }
    return borderArray;
  }

  public findEdge(coords) {
    // takes coordinate array [x, y] and starts looking for an edge. Stops when
    // it finds one and initiates traverse
    this.moveVector = [0, 1];
    this.nodeA = new CheckNode(coords[0], coords[1]);
    this.checkEdge(this.nodeA);
    this.moveNode(this.nodeA);
    this.nodeB = this.nodeA.pastNode;

    // debugLog
    console.log(this.nodeA);
    console.log(this.nodeB);


    // var testLimit = 0;
    // while (this.nodeA.edge === this.nodeB.edge && testLimit < 100) {
    //   this.moveNode(this.nodeA);
    //   this.moveNode(this.nodeB);
    //   testLimit++;
    // }
    // this.moveVector = [1, 0];
    // return this.traverse();
  }

  public checkEdge(targetNode: CheckNode) {
    // checks to see if a node is on the "edge" (is black, for now) or is at
    // the edge of the image
    var index = targetNode.getIndex(this.imageData, this.imageDepth);
    var darkness = this.imageData.data[index] + this.imageData.data[index + 1] + this.imageData.data[index + 2];
    if (darkness > this.cutoff || targetNode.x === 0 || targetNode.x === (this.imageData.width - 1) || targetNode.y === (this.imageData.height - 1) || targetNode.y === 0) {
      targetNode.edge = true;
    }
  }

  public checkNodeContrast() {
    this.nodeContrast = (this.nodeA.edge !== this.nodeB.edge);
  }

  public tester() {
    console.log("all linked up");
  }
}
