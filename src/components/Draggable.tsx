import React, { useCallback, useEffect, useRef, useState } from 'react';

import DragState from '../utils/dragStateVO';
import { error, log } from '../utils/consoleConfig';
import { addEv, rmvEv } from '../utils/eventConfigs';
import IChildrenPropType from '../types/IChildrenPropType';
import { DRAGGABLE_CONTAINER_ID } from '../utils/draggableConstants';
import { getPositionX, getPositionY, getStyleObj } from '../utils/cleanCode';
import { alterInitialPosition, getNewDragPositionX, getNewDragPositionY, predictBoundaries } from '../utils/dragPositionUtils';
import { IDragEventType } from '../types/IDragEventType';

interface IDraggable {
  Children : (props : IChildrenPropType) => JSX.Element
  handle?:string;
  initialPosition?: {x: number , y : number};
  boundary?: string;

  defaultClassNames?: string;
  classNamesOnMouseDown?:string;
  classNamesOnMouseMove?:string;
  classNamesOnMouseUp?:string;

  disabled?:boolean;

  onDragStart?: (eventData : IDragEventType) => void;
  onDragEnd?:(eventData : IDragEventType) => void;
  onDrag?:(eventData : IDragEventType) => void;
}

const Draggable = (props : IDraggable) => {
  const {Children} = props;

  // Behold, the mighty dragState! Our main hero for the entire drag saga.
  const [dragState, setDragState] = useState<DragState>(() => {
    const newDragState = new DragState();
    
    // 1 . Set the default classNames : 
    if(props.defaultClassNames) {
      newDragState.setClassNames(props.defaultClassNames);
    }

    // 3 . Initial position : 
    if(props.initialPosition) {
      const {x = 0 , y = 0} = props.initialPosition;
      newDragState.setInitX(x);
      newDragState.setInitY(y);

      newDragState.setActualX(x);
      newDragState.setActualY(y);

      newDragState.setIsPositionCaptured(true);
    }
    return newDragState;
  });

  // This is our sneaky little ref that spies on the drag state, so we can pass the juicy details between methods
  const dragStateRef = useRef(dragState);
  dragStateRef.current = dragState;

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
  } , []);

  const addClassNames = useCallback((classNames :string) => {
    setDragState(prevDragState => {
      const newDragState = DragState.getInstanceClone(prevDragState);
      newDragState.setClassNames(classNames);
      return newDragState;
    })
  },[]);

  const constructEventPayload = useCallback((event : MouseEvent) => {
    return {
      event,
      x : dragStateRef.current.actualX,
      y : dragStateRef.current.actualY
    } as IDragEventType
  } , []);

  // When mouse Up : 
  const onMouseUp = useCallback((mouseUpEvent : MouseEvent) => { 
    console.log("Mouse Up event");
    // Remove the mouse move event on document : 
    rmvEv(document , 'mousemove' , onMouseMove);

    // Remove the mose up event on document : 
    rmvEv(document , 'mouseup' , onMouseUp);

    // Dressing up the draggable container with defaultClassNames and mouseDownClassNames
    const classNames = `${props.defaultClassNames ?? ''} ${props.classNamesOnMouseUp ?? ''}`;
    if(classNames) {
      addClassNames(classNames ?? '');
    }

    props.onDragEnd?.(constructEventPayload(mouseUpEvent));
  } , []);

  // Listen for mouse Up : 
  const listenMouseUp = () => {
    addEv(document , 'mouseup' , onMouseUp);
  }

  const setPosition = () => {
    setDragState((prevDragState) => {
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
    })
  }

  const onMouseMove = useCallback((mouseMoveEvent : MouseEvent) => {

    /*
      1. We're using onMouseDown and onMouseMove as callbacks for addEventListener.
      2. These methods get recreated on each re-render, so removing them with the new versions won't work.
      3. To fix this, I wrapped them in useCallback with an empty dependency array.
      4. But then, we hit a snag: couldn't access the current state in these methods.
      5. The solution? Using prevState in setState to get the current state inside the useCallback-wrapped methods.
    */

    setDragState((prevDragState) => {
      prevDragState.setMouseMoveX(mouseMoveEvent.clientX);
      prevDragState.setMouseMoveY(mouseMoveEvent.clientY);

      // Dressing up the draggable container with defaultClassNames and mouseMoveClassNames
      const classNames = `${props.defaultClassNames ?? '' } ${props.classNamesOnMouseDown ?? ''} ${props.classNamesOnMouseMove ?? ''}`
      if(classNames) {
        prevDragState.setClassNames(classNames);  
      }

      const newDragState = DragState.getInstanceClone(prevDragState);
      return newDragState;
    });

    setPosition();

    props.onDrag?.(constructEventPayload(mouseMoveEvent));
  } , []);

  const listenMouseMove = () => {
    addEv(document , 'mousemove' , onMouseMove);
  }

  const saveMouseDownPosition = (mouseDownEvent : MouseEvent) => {
    const {clientX , clientY} = mouseDownEvent;
    setDragState((prevDragState) => {
      prevDragState.setMouseDownX(clientX);
      prevDragState.setMouseDownY(clientY);
      const newDragState = DragState.getInstanceClone(prevDragState);
      return newDragState;
    })
  }

  const setInitialPosition = useCallback(() => {
    const node = getDraggableContainer();
    
    if(node) {
      const {left , top} = node.getBoundingClientRect();

      setDragState((prevDragState) => {
        prevDragState.setInitX(left);
        prevDragState.setInitY(top);

        prevDragState.setActualX(left);
        prevDragState.setActualY(top);
        prevDragState.setIsPositionCaptured(true);
        const newDragState = DragState.getInstanceClone(prevDragState);
        return newDragState;
      })
    }
  } , []);

  const setBoundaries = useCallback(() => {
    const boundaryNode = getBoundaryElem();
    const draggable = getDraggableContainer();

    if(boundaryNode && draggable) {
      const {maxLeft , maxTop , minLeft , minTop} = predictBoundaries(boundaryNode , draggable);

      setDragState((prevDragState) => {
        prevDragState.setBoundMinLeft(minLeft);
        prevDragState.setBoundMaxLeft(maxLeft);
        prevDragState.setBoundMinTop(minTop);
        prevDragState.setBoundMaxTop(maxTop);
        const newDragState = DragState.getInstanceClone(prevDragState);
        return newDragState;
      })
    }
  } , []);

  const collapseSelectionIfExists = useCallback(() => {
    const selection = window.getSelection();
    if((selection?.rangeCount ?? 0) > 0) {
      const range = selection?.getRangeAt(0);
      if(range) {
        range.collapse();
      }
    }
  } , []);

  const onMouseDown = useCallback((mouseDownEvent : MouseEvent) => {
    setInitialPosition();

    saveMouseDownPosition(mouseDownEvent);

    setBoundaries();

    props.onDragStart?.(constructEventPayload(mouseDownEvent));

    // Dressing up the draggable container with defaultClassNames and mouseDownClassNames
    const classNames = `${props.defaultClassNames ?? ''} ${props.classNamesOnMouseDown ?? ''}`;
    if(classNames) {
      addClassNames(classNames ?? '');
    }

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

  const checkBoundaryAndSetPosition = () => {
    
    setDragState((prevDragState) => {
      const {boundary} = props;
      const newDragState = DragState.getInstanceClone(prevDragState);

      if(boundary) {
        const boundaryNode = document.querySelector(boundary);
        const draggable = getDraggableContainer();
        if(boundaryNode) {
            const {x , y} = alterInitialPosition(boundaryNode , draggable!);
            newDragState.setActualX(x);
            newDragState.setActualY(y);
            newDragState.setIsPositionCaptured(true);
            return newDragState;
        }else{
          console.warn("Uh-oh! Boundary element missing from the DOM. The draggable component is now a free spirit!")
        }
      }

      const draggable = getDraggableContainer();
      const {left , top} = draggable!.getBoundingClientRect();
      newDragState.setActualX(left);
      newDragState.setActualY(top);
      newDragState.setIsPositionCaptured(true);
      return newDragState;
    });

  }
  
  useEffect(() => {
    // And so the adventure commences!
    
    // No draggable container? No need for all this code. Let's shut it down here and grab a coffee!
    const draggable = getDraggableContainer();
    if(!draggable || props.disabled) return ;

    listenMouseDown();

    // If a boundary is provided, ensure the draggable element remains within it.
    checkBoundaryAndSetPosition();
  } , []);

  const getProps = () : IChildrenPropType => {
    let finalPropObj : IChildrenPropType = {
      id : DRAGGABLE_CONTAINER_ID , 
      className : dragState.getClassNames() ?? ''
    }
    // get position :
    if(dragState.isPositionCaptured()) {
      finalPropObj = Object.assign(finalPropObj , getStyleObj(dragState.getActualX() , dragState.getActualY()));
    }
    return finalPropObj;
  }

  return (
    <Children {...getProps()} />
  )
}

export default Draggable;
