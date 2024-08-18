import React from 'react'

import { IChildrenPropType } from 'dragzilla';



const WithoutHandler = (props : IChildrenPropType) => {
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
      <div id={id} className={`${className} draggable-elem display-flex justify-content-center align-items-center`} style={finalStyle}>Dragzilla</div>
    )
}

export default WithoutHandler;
