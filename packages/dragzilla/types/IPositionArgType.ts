export interface IPositionX {
    mouseDownX : number;
    mouseMoveX : number ; 
    initX : number , 
    lastMouseMoveX: number;
    boundaryConfig? : {
        boundMinLeft : number , 
        boundMaxLeft : number
    };
}

export interface IPositionY {
    mouseDownY : number;
    mouseMoveY : number ; 
    initY : number , 
    lastMouseMoveY: number;
    boundaryConfig? : {
        boundMinTop : number , 
        boundMaxTop : number
    };
}