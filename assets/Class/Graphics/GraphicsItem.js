class GraphicsItem {
  constructor(obj) {
    this.isSelected = false;
    this.parent = undefined;
    this.isDragged = false;
    this.draggedPoint = {};
  }
  draw() {}
  handleMousePress(e){}
  handleMouseDrag(e){}
  handleMouseRelease(e){}
  setPos(x,y){}
  parent() {
    return this.parent;
  }
}
  
