import React, { useCallback, useEffect, useState } from 'react';

import DragState from '../utils/dragStateVO';
import { error, log } from '../utils/consoleConfig';
import { addEv, rmvEv } from '../utils/eventConfigs';
import IChildrenPropType from '../types/IChildrenPropType';
import { DRAGGABLE_CONTAINER_ID } from '../utils/draggableConstants';
import { getPositionX, getPositionY, getStyleObj } from '../utils/cleanCode';
import { alterInitialPosition, getNewDragPositionX, getNewDragPositionY, predictBoundaries } from '../utils/dragPositionUtils';

interface IDraggable {
    Children : (props : IChildrenPropType) => JSX.Element
    handle?:string;
    initialPosition?: {x: number , y : number};
    onDrag?: (domRect : DOMRect) => void;
    boundary?: string;
    classNameOnDrag?:string;
    classNameOnDragStart?:string;
}

const Draggable = (props : IDraggable) => {
  const {Children} = props;

  // Behold, the mighty dragState! Our main hero for the entire drag saga.
  const [dragState, setDragState] = useState<DragState | null>(null);

  // This method need to be revisted !!
  const getDraggableContainer = useCallback(() => {
    return document.getElementById(DRAGGABLE_CONTAINER_ID);
  } , []);

  const getBoundaryElem = useCallback(() => {
    const {boundary} = props;
    if(boundary) {
      const boundaryElem = document.querySelector(boundary) ?? null;
      return boundaryElem;
    }
    return null;
  } , []);

  const getHandle = useCallback(() => {
    const {handle} = props;
    if(handle) {
      return document.querySelector(handle) ?? null;
    }
    return null;
  } , [])

  // When mouse Up : 
  const onMouseUp = useCallback(() => {
    log("Mouse Up event check - ok");
    
    // Remove the mouse move event on document : 
    rmvEv(document , 'mousemove' , onMouseMove);

    // Remove the mose up event on document : 
    rmvEv(document , 'mouseup' , onMouseUp);
  } , []);

  // Listen for mouse Up : 
  const listenMouseUp = () => {
    addEv(document , 'mouseup' , onMouseUp);
  }


  const setPosition = () => {
    setDragState((prevDragState) => {
      if(prevDragState) {
        // x position : 
        const finalLeft = getNewDragPositionX(getPositionX(props.boundary , prevDragState));
        if(finalLeft) {
          prevDragState.setLastMouseMoveX(prevDragState.getActualX())
          prevDragState.setActualX(finalLeft);
        }

        // y position : 
        const finalTop = getNewDragPositionY(getPositionY(props.boundary , prevDragState));
        if(finalTop) {
          prevDragState.setLastMouseMoveY(prevDragState.actualY);
          prevDragState.setActualY(finalTop);
        }

        // final drag state : 
        const newDragState = DragState.getInstanceClone(prevDragState);
        return newDragState;
      } 
      return null;
    })
  }

  const onMouseMove = useCallback((mouseMoveEvent : MouseEvent) => {

    /*
      1. We're using onMouseDown and onMouseMove as callbacks for addEventListener.
      2. These methods get recreated on each re-render, so removing them with the new versions won't work.
      3. To fix this, we wrapped them in useCallback with an empty dependency array.
      4. But then, we hit a snag: couldn't access the current state in these methods.
      5. The solution? Using prevState in setState to get the current state inside the useCallback-wrapped methods.
    */

    setDragState((prevDragState) => {
      if(prevDragState) {
        prevDragState?.setMouseMoveX(mouseMoveEvent.clientX);
        prevDragState?.setMouseMoveY(mouseMoveEvent.clientY);
        const newDragState = DragState.getInstanceClone(prevDragState);
        return newDragState;
      }
      return null;
    });

    setPosition();
  } , []);

  const listenMouseMove = () => {
    addEv(document , 'mousemove' , onMouseMove);
  }

  const saveMouseDownPosition = (mouseDownEvent : MouseEvent) => {
    const {clientX , clientY} = mouseDownEvent;
    setDragState((prevDragState) => {
      if(prevDragState) {
        prevDragState.setMouseDownX(clientX);
        prevDragState.setMouseDownY(clientY);
        const newDragState = DragState.getInstanceClone(prevDragState);
        return newDragState;
      }
      return null;
    })
  }

  const setInitialPosition = useCallback(() => {
    const node = getDraggableContainer();
    
    if(node) {
      const {left , top} = node.getBoundingClientRect();

      const dragState = new DragState();
      dragState.setInitX(left);
      dragState.setInitY(top);

      dragState.setActualX(left);
      dragState.setActualY(top);

      setDragState(dragState);
    }
  } , []);

  const setBoundaries = useCallback(() => {
    const boundaryNode = getBoundaryElem();
    const draggable = getDraggableContainer();

    if(boundaryNode && draggable) {
      const {maxLeft , maxTop , minLeft , minTop} = predictBoundaries(boundaryNode , draggable);

      setDragState((prevDragState) => {
        if(prevDragState) {
          prevDragState.setBoundMinLeft(minLeft);
          prevDragState.setBoundMaxLeft(maxLeft);
          prevDragState.setBoundMinTop(minTop);
          prevDragState.setBoundMaxTop(maxTop);
          const newDragState = DragState.getInstanceClone(prevDragState);
          return newDragState;
        }
        return null;
      })
    }
  } , []);

  const collapseSelectionIfExists = useCallback(() => {
    const range = window.getSelection()?.getRangeAt(0) ?? null;
    if(range) {
      range.collapse();
    }
  } , []);

  const onMouseDown = useCallback((mouseDownEvent : MouseEvent) => {
    setInitialPosition();

    saveMouseDownPosition(mouseDownEvent);

    setBoundaries();

    // Poof! No more selection. Now the mouse up event can work its magic!
    collapseSelectionIfExists();

    // Heads up! Listening to mouse move and mouse down events on the document, not the draggable element, to keep things smooth and speedy!
    listenMouseMove();
    listenMouseUp();
  } , []);

  const listenMouseDown = useCallback(() => {
    const {handle} = props;
    if(handle) {
      // Of there is handle to set the event on that
      const handle = getHandle();
      if(handle) {
        addEv(handle , 'mousedown' , onMouseDown);
        return true;
      }
    }

    const node = getDraggableContainer();
    if(node) {
      addEv(node , 'mousedown' , onMouseDown);
      return true;
    }else{
      error("Oops! We couldn't find the draggable container in your DOM. It's playing hide and seek!");
    }
  } , []);

  const altrPosWhnNotInBound = () => {
    const {boundary} = props;
    if(boundary) {
      const boundaryNode = document.querySelector(boundary);
      const draggable = getDraggableContainer();
      if(boundaryNode && draggable) {
          const {x , y} = alterInitialPosition(boundaryNode , draggable);
          const newDragState = new DragState();
          newDragState.setActualX(x);
          newDragState.setActualY(y);
          setDragState(newDragState);
        }
      }else{
        console.warn("Uh-oh! Boundary element missing from the DOM. The draggable component is now a free spirit!")
      }
  }
  
  useEffect(() => {
    // And so the adventure commences!

    listenMouseDown();

    // If a boundary is provided, ensure the draggable element remains within it.
    altrPosWhnNotInBound();
  } , []);

  const getProps = () : IChildrenPropType => {

    let finalPropObj : IChildrenPropType = {
      id : DRAGGABLE_CONTAINER_ID , // Need to user specified 
      className : '',
    };

    if(!dragState) {
      // Set the initial position of the element based on the user's specified coordinates
      const {initialPosition} = props;
      if(initialPosition) {
        return Object.assign(finalPropObj , getStyleObj(initialPosition.x , initialPosition.y))
      }
      return finalPropObj;
    }else{
      return Object.assign(finalPropObj , getStyleObj(dragState.getActualX() , dragState.getActualY()));
    }
  }

  return (
    <Children {...getProps()} />
  )
}

export default Draggable;
