function Pair(x, y, content) {
  this.posLeft = createVector(x, y);
  this.posRight = createVector(x + BOX_SIZE, y);
  this.middleLeft = createVector(this.posLeft.x + BOX_SIZE/2, this.posLeft.y + BOX_SIZE/2);
  this.middleRight = createVector(this.middleLeft.x + BOX_SIZE, this.posLeft.y + BOX_SIZE/2);
  this.content = content;
}

Pair.prototype.draw = function () {
  
  this.drawLeftSide();
  this.drawRightSide();
}
 
Pair.prototype.drawLeftSide = function () {
  drawBox(this.posLeft);

  if (typeof this.content[0] === "number") {
    drawElement(this.posLeft, this.middleLeft, this.content[0], 0);
  }

  if (typeof this.content[0] === "object") {
    if (this.content[0] != 0) {
      drawNewPair(this.middleLeft, this.posLeft.x, this.posLeft.y + BOX_SIZE * 4, this.content[0]);
    } else {
      drawNil(this.posLeft);
    }
  }
}

Pair.prototype.drawRightSide = function () {
  drawBox(this.posRight);
  
  if (typeof this.content[1] === "number") {
    drawElement(this.posRight, this.middleRight, this.content[1], 5);
  }
  
  if (typeof this.content[1] === "object") {
    if (this.content[1] != 0) {
      drawNewPair(this.middleRight, this.posRight.x + BOX_SIZE * 2, this.posRight.y, this.content[1]);
    } else {
      drawNil(this.posRight);
    }
  }
}

function connectFromTop(from, to) {
  line(from.x, from.y, to.x + BOX_SIZE/2, to.y);
  fill(0);
  triangle(to.x + BOX_SIZE/2, to.y,
           to.x + BOX_SIZE/2 - 2, to.y - 2,
           to.x + BOX_SIZE/2 + 2, to.y - 2);
  noFill();
}

function connectFromLeft (from, to) {
  line(from.x, from.y, to.x, to.y + BOX_SIZE/2);
  fill(0);
  triangle(to.x, to.y + BOX_SIZE/2,
           to.x - 2, to.y - 2 + BOX_SIZE/2,
           to.x - 2, to.y + 2 + BOX_SIZE/2);
  noFill();
}

function drawNewPair(from, toX, toY, content) {
  drawBlackDot(from);
  
  let p = new Pair(toX, toY, content);
  p.draw();
  if (toX - from.x < toY - from.y) {
    connectFromTop(from, p.posLeft);
  } else {
    connectFromLeft(from, p.posLeft);
  }
}

function drawNil(pos) {
  line(pos.x, pos.y + BOX_SIZE, pos.x + BOX_SIZE, pos.y);
}

function drawElement(pos, middle, content, offset) {
  drawBlackDot(middle);

  const el = new Element(pos.x + offset, pos.y + BOX_SIZE * 2, content);
  el.draw();
  el.connect(middle);
}

function drawBlackDot(position) {
  fill(0);
  ellipse(position.x, position.y, 8, 8);
  noFill();
}

function drawBox(position) {
  rect(position.x, position.y, BOX_SIZE, BOX_SIZE);
}
