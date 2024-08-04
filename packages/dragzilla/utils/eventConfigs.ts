export const addEv = (elem : Node , event : keyof GlobalEventHandlersEventMap , onEvent : (event : MouseEvent) => any) => {
    // @ts-ignore
    elem.addEventListener(event , onEvent);
}

export const rmvEv = (elem : Node , event : keyof GlobalEventHandlersEventMap , onEvent : (event : MouseEvent) => any) => {
    // @ts-ignore
    elem.removeEventListener(event , onEvent);
}

