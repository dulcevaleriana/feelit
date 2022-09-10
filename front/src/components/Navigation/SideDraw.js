import React from "react";
import ReactDOM from 'react-dom';

const SideDraw = (props) => {
    const content = <aside className="class-SideDraw">{props.children}</aside>
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDraw;