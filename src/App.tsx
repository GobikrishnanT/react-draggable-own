import React, { useCallback, useState } from 'react';
import Draggable from './components/Draggable';
import IChildrenPropType from './types/IChildrenPropType';
import { IDragEventType } from './types/IDragEventType';

const App = () => {

  // I am not sure i can use the IChildrenProp here !! --- Need to Check
  const DraggableComponent = useCallback((props : IChildrenPropType) => {

    // This style must be included in below returning JSX !.. 
    const {id , className , style = {}} = props;


    return (
      <div id={id} className={className} style={{...style , width : '100px' , height : '100px' , border : "3px solid red", display: "flex"}} >
        <div className='handle' style={{width : "30px"}}>Drag</div>
        <div style={{flexGrow : "1"}}>Elem</div>
      </div>
    )
  } ,[])

  const onDragStart = (event : IDragEventType) => {
    console.log(event , "On Mouse Down");
  }

  const onDrag = (event : IDragEventType) => {
    console.log(event , "On Mouse Move");
  } 

  const onDragEnd = (event : IDragEventType) => {
    console.log(event , "On Mouse Up");
  }

  return (
    <Draggable 
    defaultClassNames='dragger-component-new-own' 
    classNamesOnMouseDown='mouse-down-classname' 
    classNamesOnMouseMove='mouse-move-classname'
    classNamesOnMouseUp='mouse-up-classname'
    Children={DraggableComponent} 
    onDragStart={onDragStart}
    onDrag={onDrag}
    onDragEnd={onDragEnd}
    boundary='.boundary' />
  )
} 

export default App;
