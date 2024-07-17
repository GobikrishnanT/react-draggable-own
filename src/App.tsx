import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Draggable from 'react-draggable'

function App() {
  const nodeRef = useRef(null);

  return (
      <>
        <div className='bound' style={{border : "2px solid red" , height : "400px"}}>

        <Draggable defaultPosition={{x : 100 , y : 700}} nodeRef={nodeRef} bounds={'.bound'}>
          <div ref={nodeRef} style={{height : "100px" , backgroundColor : "blueviolet" , width : "100px"}}>Gobi</div>
        </Draggable>


        </div>
 
      </>
  )
}

export default App
