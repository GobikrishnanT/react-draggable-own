const log = (msg , type) => {
    return ;
    console[type ?? 'log'](msg);
};

log("Started" , "info");

class DragPoint {
    initX;
    initY;

    boundMinLeft;
    boundMaxLeft;
    

    boundMinTop;
    boundMaxTop;

    mouseDownX;
    mouseDownY;

    mouseMoveX;
    mouseMoveY;

    lastMouseMoveX;
    lastMouseMoveY;

    // setting initial element's left 
    getInitX () {
        return this.initX;
    }

    getInitY () {
        return this.initY;
    }

    setInitX(initX) {
        this.initX = initX;
    }

    setInitY(initY) {
        this.initY = initY;
    }


    getMouseDownX () {
        return this.mouseDownX;
    }

    getMouseDownY () {
        return this.mouseDownY;
    }

    setMouseDownX(mouseDownX) {
        this.mouseDownX = mouseDownX;
    }

    setMouseDownY(mouseDownY) {
        this.mouseDownY = mouseDownY;
    }

    // Mouse Move : 
    getMouseMoveX () {
        return this.mouseMoveXX;
    }

    getMouseMoveY () {
        return this.mouseMoveY;
    }

    setMouseMoveX(mouseMoveX) {
        this.mouseMoveX = mouseMoveX;
    }

    setMouseMoveY(mouseMoveY) {
        this.mouseMoveY = mouseMoveY;
    }

    // last mouse move 
    getLastMouseMoveX () {
        return this.lastMouseMoveX;
    }

    getLastMouseMoveY () {
        return this.lastMouseMoveY;
    }

    setLastMouseMoveX(lastMouseMoveX) {
        this.lastMouseMoveX = lastMouseMoveX;
    }

    setLastMouseMoveY(lastMouseMoveY) {
        this.lastMouseMoveY = lastMouseMoveY;
    }

    // setting the boundary position : 
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

    setBoundMinLeft(boundMinLeft) {
        this.boundMinLeft = boundMinLeft;
    }
    
    setBoundMaxLeft(boundMaxLeft) {
        this.boundMaxLeft = boundMaxLeft;
    }

    setBoundMinTop(boundMinTop) {
        this.boundMinTop = boundMinTop;
    }

    setBoundMaxTop(boundMaxTop) {
        this.boundMaxTop = boundMaxTop;
    }
}

let dragPoint = new DragPoint();

// Utility methods : 
const getDraggble = () => {
    return document.querySelector('.draggable');
}

// Fetch the specified style property for the elem if property or otherwise null; 
const getStyleProperty = (elem , property , parse) => {
    if(!elem) return null;
    const styleObj = getComputedStyle(elem);
    if(!styleObj) return null;
    const value = styleObj[property];
    if(!value) return;
    return parse ? parseInt(value) : value;
}

// Add an event for an element
const addEvent = (elem, event, callBack) => {
    if(elem) {
        elem.addEventListener(event , callBack);
        return true;
    }
    return false;
}

// Remove an event from an element
const removeEvent = (elem , event , callBack) => {
    if(elem) {
        elem.removeEventListener(event , callBack);
        return true;
    }
    return false;
}

const recordLastMoves = (mouseMoveX , mouseMoveY) => {
    dragPoint.setLastMouseMoveX(mouseMoveX);
    dragPoint.setLastMouseMoveY(mouseMoveY);
}


const setPosition = () => {
    const draggable = getDraggble();
    // cal the x side
    const {mouseDownX, mouseDownY , mouseMoveX , mouseMoveY , lastMouseMoveX , lastMouseMoveY , initX , initY} = dragPoint;

    // X portion

    if((mouseDownX && mouseMoveX) && (mouseMoveX !== lastMouseMoveX)) {
        let newLeft = mouseMoveX - mouseDownX;  
        log("new Left" + newLeft);
        const finalLeft = initX + newLeft;
        log("Final Left" + finalLeft);
        const {boundMinLeft , boundMaxLeft} = dragPoint;
        if((boundMinLeft <= finalLeft) && (boundMaxLeft >= finalLeft)) {
            draggable.style.left = finalLeft+ 'px';
        }
    }

    // y portion
    if((mouseDownY && mouseMoveY) && (mouseMoveY !== lastMouseMoveY)) {
        let newTop = mouseMoveY - mouseDownY;
        const finalTop = initY + newTop;
        log("Final top" + finalTop);
        const {boundMinTop , boundMaxTop} = dragPoint;
        if((boundMinTop <= finalTop) && (boundMaxTop >= finalTop)) {
            draggable.style.top = finalTop+ 'px';
        }
    }

    recordLastMoves(mouseMoveX , mouseMoveY);
}

const onMouseMove = (mouseMoveEvent) => {

    if(mouseMoveEvent) {
        dragPoint.setMouseMoveX(mouseMoveEvent.clientX);
        dragPoint.setMouseMoveY(mouseMoveEvent.clientY);
    }

    log("Mouse Move Event");
    log(mouseMoveEvent);
    log(dragPoint);
    setPosition();
}

const onMouseUp = (mouseUpEvent) => {
    log("MouseUp Event");
    document.removeEventListener('mousemove' , onMouseMove);
    document.removeEventListener('mouseup' , onMouseUp);
}

const onMouseLeave = (mouseLeveEvent) => {
    console.log("Mouse Leave event");
    const draggable = getDraggble();
    document.removeEventListener('mousemove' , onMouseMove);
    document.removeEventListener('mouseup' , onMouseUp);
    draggable.removeEventListener('mouseleave' , onMouseLeave);
}

const listenMouseMove = () => {
    // mouse move on document because the same x and y we will get from it, and also we can easily listen for the speed move
    document.addEventListener('mousemove' , onMouseMove);
    document.addEventListener('mouseup' , onMouseUp);

    log('Started Listen for the mouse move from document');
}

const listenMouseLeave = () => {
    const draggable = getDraggble();
    draggable.addEventListener('mouseleave' , onMouseLeave);
}

const setInitPosition = () => {
    const draggable = getDraggble();
    if(draggable) {
        const left = parseInt(getStyleProperty(draggable , 'left'));
        const top = parseInt(getStyleProperty(draggable , 'top'));
        dragPoint.setInitX(left);
        dragPoint.setInitY(top);
    }
}

const setBoundaryPosition = () => {
    const draggable = getDraggble();
    const {width : draggableWidth , height : draggableHeight} = draggable.getBoundingClientRect();

    const boundaryElem = document.querySelector('.bound');
    const {left , top ,width , height} = boundaryElem.getBoundingClientRect();

    // we need to add consider the padding of the boundary
    const leftPadding = getStyleProperty(boundaryElem , 'padding-left' , true);
    const rightPadding = getStyleProperty(boundaryElem , 'padding-right' , true);
    const topPadding = getStyleProperty(boundaryElem , 'padding-top' , true);
    const bottomPadding = getStyleProperty(boundaryElem , 'padding-bottom' , true);

    const minLeft = left + (leftPadding ?? 0);
    const maxLeft = left + ((width - (rightPadding ?? 0)) - draggableWidth);

    const minTop = top + (topPadding ?? 0);
    const maxTop = top + ((height - (bottomPadding ?? 0)) - draggableHeight);

    dragPoint.setBoundMinLeft(minLeft);
    dragPoint.setBoundMaxLeft(maxLeft);
    dragPoint.setBoundMinTop(minTop);
    dragPoint.setBoundMaxTop(maxTop);

    log("dragPoint");
    log(dragPoint);
}

const onMouseDown = (e) => {

    // Need to save this mouse down point : 
    if(dragPoint) {
        dragPoint = new DragPoint();
    }

    if(e) {
        dragPoint.setMouseDownX(e.clientX);
        dragPoint.setMouseDownY(e.clientY);

        // setting the elements initial left
        setInitPosition();

        // set boundary
        setBoundaryPosition();
    }

    log("Mouse Down Event");
    log(dragPoint);
    listenMouseMove();
}

// listen for mouse down event : 
const listenMouseDown = () => {
    const draggable = document.querySelector('.draggable');
    
    if(draggable) {
        log("Mouse Down Event Attached");
        draggable.addEventListener('mousedown' , onMouseDown);
    }
}

listenMouseDown();



// Boundary code : 
// we need to allow the user to have their boundary

