import React from 'react';

import { IChildrenPropType } from 'dragzilla';

const WithBoundaryAndNonHandle = (props : IChildrenPropType) => {
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
        <div className='boundary'>
            <div id={id} className={`${className} draggable-elem display-flex justify-content-center align-items-center`} style={finalStyle}>Dragzilla</div>
        </div>
    )
}

export default WithBoundaryAndNonHandle
