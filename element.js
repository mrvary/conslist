function Element(x, y, content) {
  this.pos = createVector(x, y);
  this.content = content;
}

Element.prototype.draw = function () {
  rect(this.pos.x, this.pos.y, BOX_SIZE, BOX_SIZE);
  fill(0);
  textAlign(CENTER);
  text(this.content, this.pos.x + BOX_SIZE/2, this.pos.y + BOX_SIZE * 0.75);
}

Element.prototype.connect = function (vec) {
  line(vec.x, vec.y, this.pos.x + BOX_SIZE/2, this.pos.y);
  fill(0);
  triangle(this.pos.x + BOX_SIZE/2, this.pos.y,
           this.pos.x + BOX_SIZE/2 - 2, this.pos.y - 3,
           this.pos.x + BOX_SIZE/2 + 2, this.pos.y - 3);
  noFill();
}