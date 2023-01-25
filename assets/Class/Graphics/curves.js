class ParametricCurve{
  constructor(controlPoint,control) {
    this.ctrlPt = controlPoint;
    this.children = [];
    this.color = {r:0,g:0,b:0};
    if(!control)
    this.drawControlPoint();
  }

  draw() {

    let point = {};
    let lastPoint = {
      x : this.ctrlPt.p0.x,
      y :this.ctrlPt.p0.y
    };
    for(let i = 0; i <= 100; i++) {
      var t = i/100;
      point = this.curveGenerator(this.ctrlPt,t,point);
      push();
      stroke(this.color.r,this.color.g,this.color.b);
      strokeWeight(1.5);
      line(point.x,point.y,lastPoint.x,lastPoint.y);
      pop();
      lastPoint.x = point.x;
      lastPoint.y = point.y;

    }


  }

  drawControlPoint() {

    let p = this.ctrlPt;
    for(let ctr in p) {



      let cp = new MovableCircle(p[ctr],10,this);
      this.children.push(cp)

    }
  }
}


class Hermite extends ParametricCurve {
  constructor(controlPoint) {
    super(controlPoint);


  }

  curveGenerator(pt,t,point) {

    point.x = pt.p0.x * (2 * t ** 3 - 3 * t ** 2 + 1) + pt.p1.x * (-2 * t ** 3 + 3 * t ** 2)
              + pt.p2.x * (t ** 3 - 2 * t ** 2 + t ) + pt.p3.x * (t **3 - t ** 2);
    point.y = pt.p0.y * (2 * t ** 3 - 3 * t ** 2 + 1) + pt.p1.y * (-2 * t ** 3 + 3 * t ** 2)
              + pt.p2.y * (t ** 3 - 2 * t ** 2 + t ) + pt.p3.y * (t **3 - t ** 2);

    return point;
  }
}



class MovableCircle{
  constructor(p,d) {
  this.p = p;
    this.diameter = d;

  }
  draw() {
    push();
    stroke(this.color.r,this.color.g,this.color.b);
    ellipseMode(CENTER)
    ellipse(this.p.x,this.p.y,this.diameter);
    pop();

  }
  handleDrag(mouseX,mouseY) {
    //console.log('called');
    if(dist(mouseX,mouseY,this.p.x,this.p.y) <=this.diameter) {
      this.p.x = mouseX;
      this.p.y = mouseY;
      return true;
    }
    else
      return false;
  }
  setPos(x,y) {
    this.p.x = x;
    this.p.y = y;
  }
}



class Bezier extends ParametricCurve {
  constructor(controlPoint,control) {
    super(controlPoint,control);


  }

  curveGenerator(pt,t,point) {

    point.x = pt.p0.x * Math.pow(1-t,3) +
              pt.p1.x * Math.pow(t,3) +
              pt.p2.x * Math.pow(1-t,2) * 3 *t +
              pt.p3.x * 3 * t * t * (1 - t);

    point.y = pt.p0.y * Math.pow(1-t,3) +
              pt.p1.y * Math.pow(t,3) +
              pt.p2.y * Math.pow(1-t,2) * 3 *t +
              pt.p3.y * 3 * t * t * (1 - t);

    return point;
  }

}
