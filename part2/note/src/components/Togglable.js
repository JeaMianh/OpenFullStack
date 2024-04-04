import React, { useState, forwardRef, useImperativeHandle } from "react";

// forwardRef 使组件可以访问分配给它的 Ref
const Togglabel = forwardRef((props, ref) => {
    const [visible, SetVisible] = useState(false)

    const hide = { display: visible ? 'none' : ''}
    const show = { display: visible ? '' : 'none'}

    const toggleVisibilty = () => {
        SetVisible(!visible)
    }

    // 使得 toggleVisibilty 在组件之外可用
    useImperativeHandle(ref, () => {
        return {
            toggleVisibilty
        }
    })
    
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
})

export default Togglabel