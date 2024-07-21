import React, { useCallback, useState } from 'react';
import Draggable from './components/Draggable';
import IChildrenPropType from './types/IChildrenPropType';

const App = () => {

  // I am not sure i can use the IChildrenProp here !! --- Need to Check
  const DraggableComponent = useCallback((props : IChildrenPropType) => {

    // This style must be included in below returning JSX !.. 
    const {id , className , style = {}} = props;


    return (
      <div id={id} className={className} style={{...style , width : '100px' , height : '100px' , border : "3px solid red", display: "flex"}} >
        <div className='handle' style={{backgroundColor : "black", width : "30px"}}>Drag</div>
        <div style={{flexGrow : "1"}}>Elem</div>
      </div>
    )
  } ,[])

  return (
    <Draggable Children={DraggableComponent} boundary='body' handle='.handle' />
  )
}

export default App;
