import React from 'react';

import { IChildrenPropType } from 'dragzilla';

const WithHandler = (props : IChildrenPropType) => {
    const {className , id ,style} = props;
    let finalStyle = (() => {
        const customStyle = {
            // any of custom style
        };
        if(style && Object.keys(style ?? {}).length) {
            return {
                ...customStyle,
                ...style
            }
        }
        return customStyle;
    })();
    
    return (
        <div id={id} className={`${className} draggable-elem display-flex`} style={finalStyle}>
            <div className='handle cursor-pointer draggable-handle display-flex justify-content-center align-items-center'>Handle</div>
            <div className='flex-grow-1 display-flex justify-content-center align-items-center'>Dragzilla</div>
        </div>
    )
}

export default WithHandler;
