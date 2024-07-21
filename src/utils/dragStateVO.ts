export default class DragState {

    initX : number = 0;
    initY : number = 0;

    actualX : number = 0;
    actualY : number = 0;

    mouseDownX : number = 0;
    mouseDownY : number = 0;

    mouseMoveX: number = 0;
    mouseMoveY : number = 0;

    lastMouseMoveX : number = 0;
    lastMouseMoveY : number = 0;

    boundMinLeft : number = 0;
    boundMaxLeft : number = 0;
    

    boundMinTop : number = 0;
    boundMaxTop : number = 0;


    // Static method to get clone of any the instance of this class : 
    static getInstanceClone(instanceToClone : DragState) {
        if(!(instanceToClone instanceof DragState)) return null;
        return Object.assign(new DragState() , instanceToClone);
    }

    // INIT-(x , y)
    getInitX() {
        return this.initX;
    }

    setInitX(initX : number) {
      this.initX = initX
    }

    getInitY() {
      return this.initY
    }

    setInitY(initY : number) {
      this.initY = initY;
    }

    // End

    // ACTUAL - (X , Y)
    getActualX() {
        return this.actualX;
    }

    setActualX(actualX : number) {
      this.actualX = actualX; 
    }

    getActualY() {
      return this.actualY
    }

    setActualY(actualY : number) {
      this.actualY = actualY;
    }
    // END

    // MOUSE DOWN EVENT -(X , Y)
    getMouseDownX() {
        return this.mouseDownX;
    }

    setMouseDownX(mouseDownX : number) {
      this.mouseDownX = mouseDownX; 
    }

    getMouseDownY() {
      return this.mouseDownY;
    }

    setMouseDownY(mouseDownY : number) {
      this.mouseDownY = mouseDownY;
    }
    // END

    // MOUSE MOVE - (X , Y);
    getMouseMoveX() {
        return this.mouseMoveX;
    }

    setMouseMoveX(mouseMoveX : number) {
        this.mouseMoveX = mouseMoveX;
    }

    getMouseMoveY() {
        return this.mouseMoveY;
    }

    setMouseMoveY(mouseMoveY : number) {
        this.mouseMoveY = mouseMoveY;
    }
    // End
    

    // LAST MOUSE MOVE - (X , Y)
    getLastMouseMoveX() {
        return this.lastMouseMoveX;
    }

    setLastMouseMoveX(lastMouseMoveX : number) {
        return this.lastMouseMoveX = lastMouseMoveX;
    }

    getLastMouseMoveY() {
        return this.lastMouseMoveY;
    }

    setLastMouseMoveY(lastMouseMoveY : number) {
        return this.lastMouseMoveY = lastMouseMoveY;
    }

    // End

    // BOUNDARY - (X , Y)
    getBoundMinLeft() {
        return this.boundMinLeft;
    }
    
    getBoundMaxLeft() {
        return this.boundMaxLeft;
    }

    getBoundMinTop() {
        return this.boundMinTop;
    }

    getBoundMaxTop() {
        return this.boundMaxTop;
    }

    setBoundMinLeft(boundMinLeft : number) {
        this.boundMinLeft = boundMinLeft;
    }
    
    setBoundMaxLeft(boundMaxLeft : number) {
        this.boundMaxLeft = boundMaxLeft;
    }

    setBoundMinTop(boundMinTop : number) {
        this.boundMinTop = boundMinTop;
    }

    setBoundMaxTop(boundMaxTop : number) {
        this.boundMaxTop = boundMaxTop;
    }
}