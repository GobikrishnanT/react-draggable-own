import Story from "../base/storyBaseType";
import WithHandler from "../components/WithHandler";
import storyBaseConfig from "../base/storyBaseConfig";
import WithoutHandler from "../components/WithoutHandler";
import { onDrag, onDragEnd, onDragStart } from "../utils/methods";
import WithBoundaryAndNonHandle from "../components/WithBoundaryAndNonHandle";
import WithBoundaryAndHandle from "../components/WithBoundaryAndHandle";


// Exporting the base config
export default {...storyBaseConfig};

// Exporting the states : 

// 1 . All props Story : 
export const DragzillaWithAllProps = {
    args: {
        Children : WithoutHandler,
        initialPosition : {x : 0 , y : 0},
        disabled : false,
        boundary : '.dummy',
        handle : '.dummy_handle',
        classNamesOnMouseDown : 'mouse-down-event-indicating-className',
        classNamesOnMouseMove : 'mouse-move-event-indicating-className',
        classNamesOnMouseUp : 'mouse-move-event-indicating-className',
        defaultClassNames : 'default-classNames', 
        onDrag,
        onDragEnd,
        onDragStart,
      },
}

// 2 . Dragzilla with initial position : 
export const DragzillaWithInitialPosition = {
    args: {
        Children : WithoutHandler,
        initialPosition : {x : 0 , y : 0},
    },
}

// 3 . Dragzilla with disabled mode :     
export const DragzillaInDisabledMode : Story = {
    args : {
        Children : WithoutHandler,
        disabled : true
    }
}

// 4 . Dragzilla with boundary : 
export const DragzillaWithBoundary : Story = {
    args : {
        Children : WithBoundaryAndNonHandle,
        boundary : '.boundary'
    }
}

// 5 . Dragzilla with handle : 
export const DragzillaWithHandle : Story = {
    args : {
        Children : WithHandler , 
        handle : '.handle'
    }
}

// 6 . Dragzilla with handle and boundary : 
export const DragzillaWithBoundaryAndHandle : Story = {
    args : {
        Children : WithBoundaryAndHandle,
        handle : ".handles",
        boundary : '.boundary'
    }
}
