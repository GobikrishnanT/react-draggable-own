import { IPositionX, IPositionY } from "../types/IPositionArgType"
import DragState from "./dragStateVO"

export const getStyleObj = (x : number , y : number) => {
    return {
        style : {
            position : 'absolute' ,
            top : y,
            left : x
        }
    }
}

export const getPositionX = (boundary : string | undefined , dragState : DragState) => {
    let xPositionConfig : IPositionX = {
        initX : dragState.initX,
        lastMouseMoveX : dragState.lastMouseMoveX,
        mouseDownX : dragState.mouseDownX,
        mouseMoveX : dragState.mouseMoveX
      }
      if(boundary) {
        xPositionConfig = Object.assign(xPositionConfig , {
          boundaryConfig : {
            boundMinLeft : dragState.boundMinLeft , 
            boundMaxLeft : dragState.boundMaxLeft
         }
        })
    }
    return xPositionConfig;
}

export const getPositionY = (boundary : string | undefined , dragState : DragState) => {
    let yPositionConfig : IPositionY = {
        initY : dragState.initY,
        lastMouseMoveY : dragState.lastMouseMoveY,
        mouseDownY : dragState.mouseDownY,
        mouseMoveY : dragState.mouseMoveY
      }
      if(boundary) {
        yPositionConfig = Object.assign(yPositionConfig , {
          boundaryConfig : {
            boundMinTop : dragState.boundMinTop , 
            boundMaxTop : dragState.boundMaxTop
          }
        })
    }
    return yPositionConfig;
}