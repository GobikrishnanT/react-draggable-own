const log = (msg , type) => {
    console[type ?? 'log'](msg);
};

log("Started" , "info");

class DragPoint {
    initX;
    initY;

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
    
}

let dragPoint = new DragPoint();



// Utility methods : 
const getDraggble = () => {
    return document.querySelector('.draggable');
}

// Fetch the specified style property for the elem if property or otherwise null; 
const getStyleProperty = (elem , property) => {
    if(!elem) return null;
    const styleObj = getComputedStyle(elem);
    if(!styleObj) return null;
    return styleObj[property] ?? null;
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
        newLeft = Math.abs(newLeft < 0 ? 0 : newLeft);
        const finalLeft = initX + newLeft;
        draggable.style.left = finalLeft+ 'px';
    }

    // y portion
    if((mouseDownY && mouseMoveY) && (mouseMoveY !== lastMouseMoveY)) {
        let newTop = mouseMoveY - mouseDownY;
        newTop = Math.abs(newTop < 0 ? 0 : newTop);
        const finalTop = initY + newTop;
        log("Final top" + finalTop);
        draggable.style.top = finalTop+ 'px';
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
    log("Mouse Leave event");
    const draggable = getDraggble();
    draggable.removeEventListener('mousemove' , onMouseMove);
    draggable.removeEventListener('mouseup' , onMouseUp);
}

const listenMouseMove = () => {
    // mouse move on document because the same x and y we will get from it, and also we can easily listen for the speed move
    document.addEventListener('mousemove' , onMouseMove);
    document.addEventListener('mouseup' , onMouseUp);

    log('Started Listen for the mouse move from document');
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

