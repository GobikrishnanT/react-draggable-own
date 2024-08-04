import { IPositionX, IPositionY } from "../types/IPositionArgType";


export const getNewDragPositionX = (args : IPositionX) => {
    const {mouseDownX, mouseMoveX , lastMouseMoveX , initX} = args;
    if((mouseDownX && mouseMoveX) && (mouseMoveX !== lastMouseMoveX)) {
        let newLeft = mouseMoveX - mouseDownX;  
        const finalLeft = initX + newLeft;
        const {boundaryConfig} = args;
        if(boundaryConfig) {
            const {boundMaxLeft , boundMinLeft} = boundaryConfig;
            if(boundMinLeft >= finalLeft) {
                return boundMinLeft;
            }
            if(boundMaxLeft <= finalLeft) {
                return boundMaxLeft;
            }
        } 
        return finalLeft;
    } 
}

export const getNewDragPositionY = (args : IPositionY) => {
    // y portion
    const {mouseDownY , mouseMoveY , lastMouseMoveY , initY} = args;
    if((mouseDownY && mouseMoveY) && (mouseMoveY !== lastMouseMoveY)) {
        let newTop = mouseMoveY - mouseDownY;
        const finalTop = initY + newTop;

        const {boundaryConfig} = args;
        if(boundaryConfig) {
            const {boundMaxTop , boundMinTop} = boundaryConfig;
            if(boundMinTop >= finalTop) {
                return boundMinTop;
            }
            if(boundMaxTop <= finalTop) {
                return boundMaxTop;
            }
        }
        return finalTop;
    }
}

export const alterInitialPosition = (boundaryNode : Element , draggable : Element) => {
    const {top : bndTop , left : bndLeft , right : bndRight , bottom : bndBtm} = boundaryNode.getBoundingClientRect();
    const {top : drgTop , left : drgLeft , width : drgWidth, height : drgHeight} = draggable.getBoundingClientRect();
    
    // 1 . Check for left and right boundary cross : 
    const tempLeft = drgLeft + drgWidth;
    let newLeft = drgLeft;
    if(tempLeft >= bndRight) {
        newLeft = bndRight - drgWidth;
    }
    if(drgLeft < bndLeft) {
        newLeft = bndLeft;
    }


    // Check for top and bottom boundary
    const tempTop = drgTop + drgWidth;
    let newTop = drgTop;
    if(tempTop >= bndBtm) {
        newTop = bndBtm - drgHeight;
    }
    if(drgTop < bndTop) {
        newTop = bndTop;
    }

    return {
        x : newLeft,
        y : newTop
    }
}

export const predictBoundaries = (boundaryNode : Element , draggable : Element) => {
    const {width : draggableWidth , height : draggableHeight} = draggable.getBoundingClientRect();

    const {left , top ,width , height} = boundaryNode.getBoundingClientRect();
    const minLeft = left;
    const maxLeft = left + (width - draggableWidth);

    const minTop = top;
    const maxTop = top + (height  - draggableHeight);

    return {
        minLeft , 
        maxLeft , 
        minTop , 
        maxTop
    }
}