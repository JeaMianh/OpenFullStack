import React, { useState } from "react";

const Togglabel = (props) => {
    const [visible, SetVisible] = useState(false)

    const hide = { display: visible ? 'none' : ''}
    const show = { display: visible ? '' : 'none'}

    const toggleVisibilty = () => {
        SetVisible(!visible)
    }
    
    return (
        <>
            <div style={hide}>
                <button onClick={toggleVisibilty}>{ props.buttonLabel }</button>
            </div>
            <div style={show}>
                {/* 引用组件的子组件 */}
                { props.children }
                <button onClick={toggleVisibilty}>cancel</button>
            </div>
    
        </>
        )
}

export default Togglabel