let selectObject;
var zoom = 1;
var zMin = 0.01;
var zMax = 9.00;
var sensativity = 0.00005;
let canZoom = true;
let drawer = new DFADrawer(subesh);
function setup() {
  let canvas = createCanvas(2000, 900);
  canvas.parent('parent');

  graphicsItem.item.push(drawer);
  noLoop();
}

function draw() {
  // put drawing code here
  background(255);
  scale(zoom);
  //scale(0.5,0.5);
  graphicsItem.draw();


}


function touchStarted() {
  if (touches.length) {
    //console.log(touches);
    touchCache.push({
      x: touches[touches.length - 1].x,
      y: touches[touches.length - 1].y
    });
    //console.log(touchCache);
  }
  //console.log(mouseX + " " + mouseY);
  //console.log(mouseX * zoom + " " + mouseY * zoom);
  //console.log(mouseX / zoom + " " +  mouseY / zoom);
  redraw();
}


function touchMoved(e) {

  if (touchCache.length === 2 ) {
    //console.log('SDSDS');
    let d1 = dist(touchCache[0].x, touchCache[0].y, touchCache[1].x, touchCache[1].y);
    let d2 = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y)
    console.log(d1 + " " +d2);
    //console.log(d1 + " " + d2);
    if (d1 > d2  && Math.abs(d1-d2) > 5) {
      zoom -= 0.1;
      //console.log("HEREWEW");
    } else if(d1 < d2 && Math.abs(d1-d2) > 5){
      zoom += 0.1;
    }
    zoom = constrain(zoom, zMin, zMax);
    canZoom = false;

    //mouseReleased();
    toucheCache = [];
    redraw();
    return false;
  }
  // //console.log('touch');
  if (!selectObject) {
    selectObject = graphicsItem.handleDrag(mouseX / zoom, mouseY / zoom);

  } else {
    ////console.log('here');
    selectObject.setPos(mouseX / zoom, mouseY / zoom);

  }
  redraw();
  if (selectObject) {
    return false;
  }
}



function touchEnded() {
  ////console.log('release');
  touchCache.pop();
  if (selectObject)
    selectObject = undefined;
  canZoom = true;
  redraw();
}

function mouseWheel(event) {
  if(event.ctrlKey) {
  //console.log("what");
  zoom += sensativity * event.delta;

  zoom = constrain(zoom, zMin, zMax);
  //console.log(zoom);
  redraw();

  //uncomment to block page scrolling
  return false;
}
}



//Graphics Holder

let touchCache = [];
let graphicsItem = {
  item: [],
  draw: function() {
    this.item.forEach((my) => {
      if (my.children)
        my.children.forEach(item => item.draw());
      my.draw();
    });
  },



  handleDrag: function(mouseX, mouseY) {
    let index, index2;
    this.item.every((item, ind) => {
      if (item.children) {

        if (!item.children.every((item, ind1) => {

            if (item.handleDrag(mouseX, mouseY)) {
              ////console.log("children");
              index2 = ind1;
              index = ind
              return false;

            } else
              return true;

          })) {

          return false;
        } else {
          ////console.log("how");
        }

      }

      if (item.handleDrag && item.handleDrag(mouseX, mouseY)) {
        index = ind;
        return false;

      } else
        return true;


      return true;

    });

    ////console.log(index2);
    if (index2 !== undefined)
      return this.item[index].children[index2];
    else if (index)
      return this.item[index];

  }



};
