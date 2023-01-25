class StateArc extends Bezier {

  constructor(start, end, text,reflect) {
    super({ p0: { x: -1, y: -1 }, p1: { x: -1, y: -1, }, p2: { x: 0, y: 0, }, p3: { x: 0, y: 0, } }, 1);
    this.textCoord = {};
    this.text = [text];
    this.start = start;
    this.end = end;
    this.reflect = reflect;

    //this.makeArc();
  }

  makeArc() {
    let start = this.start.center;
    let end = this.end.center;
    let stateCurve = {
      v1: new p5.Vector(0, 0),
      v2: new p5.Vector(end.x - start.x, end.y - start.y),
      v3: new p5.Vector(0, 0),
      v4: new p5.Vector(0, 0),
      textCoord: new p5.Vector(0, 0),
      isLeft: false,
      distance: dist(start.x, start.y, end.x, end.y),
      angle: Math.atan((start.y - end.y) / (start.x - end.x)),
      rotate: function(v, angle) {
        ////console.log(v);
        v.rotate(angle);
        ////console.log(v);
      },
      translate: function(...args) {
        args.forEach((item) => {
          item.add(start.x, start.y);

        });
      },
      findControl: function(reflect) {
        if (start !== end) {
          let offsetX, offsetY, textX;

          this.rotate(this.v2, -this.angle);

          this.isLeft = (start.x < end.x) ? true : false;

          offsetY = this.distance / 5;

          if (this.v2.x > this.v1.x) {
            offsetX = this.distance / 4;
            textX = this.distance / 2 + 20;
          } else {
            offsetX = -this.distance / 4;
            textX = -this.distance / 2 + 20;
          }

          this.v3.x = this.v1.x + offsetX;
          this.v3.y = this.v1.y - offsetY;
          this.v4.x = this.v2.x - offsetX;
          this.v4.y = this.v2.y - offsetY;
          this.textCoord.x = textX;

          if (reflect !== undefined && Math.abs(this.angle) !== 1.5707963267948966) {
            //console.log("why");
            //console.log(this.angle);
            this.textCoord.y = -this.distance / 7 - 25;
            stateCurve.reflect(this.v3, this.v4, this.textCoord);
          } else
            this.textCoord.y = -this.distance / 7 - 15;

          this.rotate(this.v3, this.angle);
          this.rotate(this.v4, this.angle);
          this.rotate(this.textCoord, this.angle);
          stateCurve.translate(this.v3, this.v4, this.textCoord);

        } else {
          this.v3.x = start.x - 111;
          this.v3.y = start.y - 119;
          this.v4.x = start.x + 111;
          this.v4.y = start.y - 119;
        }
      },
      reflect: function(...args) {
        args.forEach((item) => {
          item.y = -item.y;
          ////console.log(item);
        });
      }

    };
    let var1 = this.reflect;
    stateCurve.findControl(var1);
    this.ctrlPt.p0.x = start.x;
    this.ctrlPt.p0.y = start.y;
    this.ctrlPt.p1.x = end.x;
    this.ctrlPt.p1.y = end.y;
    this.ctrlPt.p2.x = stateCurve.v3.x;
    this.ctrlPt.p2.y = stateCurve.v3.y;
    this.ctrlPt.p3.x = stateCurve.v4.x;
    this.ctrlPt.p3.y = stateCurve.v4.y;
    //console.log('i was called');
    let p1 = this.curveGenerator(this.ctrlPt, 0.5, {x: 0,y: 0});

    if (start !== end)
      this.textCoord = stateCurve.textCoord;
    else
      this.textCoord = {x:p1.x,y:p1.y-10};

    let v1 = new p5.Vector(p1.x, p1.y);
    let v2 = new p5.Vector(-5, 5);
    let v3 = new p5.Vector(-5, -5);
    //console.log(stateCurve.angle);
    if (!stateCurve.isLeft) {
      v2.x = 5;
      v3.x = 5;
    }
    v2.rotate(stateCurve.angle || 0);
    v3.rotate(stateCurve.angle || 0);

    this.arrow = { p1: v1, p2: v2.add(v1), p3: v3.add(v1) };

  }



  rotate(point, angle) {
    point.x = point.x * Math.cos(angle) - point.y * sin(angle);
    point.y = point.x * Math.sin(angle) + point.y * cos(angle);
    return point;
  }

  compare(p1, p2) {
    if (p1.x == p2.x && p1.y == p2.y)
      return true;
    else
      return false;
  }

  draw() {
    if (!(this.compare(this.start.center, this.ctrlPt.p0) && this.compare(this.end.center, this.ctrlPt.p1))) {
      this.makeArc();
    }
    super.draw();
    this.drawArrow();
    this.drawText();

  }
  drawArrow() {
    push();
    fill(143, 143, 143);
    triangle(this.arrow.p1.x, this.arrow.p1.y, this.arrow.p2.x, this.arrow.p2.y, this.arrow.p3.x, this.arrow.p3.y);
    pop();
  }
  drawText() {
      push();
      strokeWeight(1);
      stroke(179, 228, 255);
      textSize(20);
      fill(30, 69, 143)
      text((this.text.join(",")) ? this.text : "", this.textCoord.x, this.textCoord.y);
      pop();
  }
  handleDrag() {

  }


}
