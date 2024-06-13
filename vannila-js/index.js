const log = (msg , type) => {
    console[type ?? 'log'](msg);
};

log("Started" , "info");

const getDraggble = () => {
    return document.querySelector('.draggable');
}

const setPosition = (mouseDownEvent) => {
    const {clientX , clientY} = mouseDownEvent;
    log(clientX + "_" +  clientY);
    const draggable = getDraggble();
    log(draggable);
    draggable.style.top = clientY+'px';
    draggable.style.left = clientX + 'px';
}

const onMouseMove = (mouseMoveEvent) => {
    log(mouseMoveEvent);
}

const onMouseUp = (mouseUpEvent) => {
    log("MouseUp Event");
    const draggable = getDraggble();
    draggable.removeEventListener('mousemove' , onMouseMove);
    draggable.removeEventListener('mouseup' , onMouseUp);
}

const listenMouseMove = () => {
    const draggable  = getDraggble();
    draggable.addEventListener('mousemove' , onMouseMove);
    draggable.addEventListener('mouseup' , onMouseUp);
    log("Mouse move and mpuse up Event Attached");
}

const onMouseDown = (e) => {
    log(e);
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

