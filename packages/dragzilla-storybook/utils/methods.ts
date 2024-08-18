import { IDragEventType } from "dragzilla";
import { action } from '@storybook/addon-actions';

const convertToJSON = (data : IDragEventType) => {
    return JSON.stringify(data);
}

export const onDrag = (args : IDragEventType) => {
    console.log(args);
    action("ON DRAG")(convertToJSON(args));
}

export const onDragEnd = (args : IDragEventType) => {
    action("ON DRAG END")(convertToJSON(args));
}

export const onDragStart = (args : IDragEventType) => {
    console.log(args);
    action("ON DRAG START")(convertToJSON(args));
}