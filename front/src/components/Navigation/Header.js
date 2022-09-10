import React from "react";
import ReactDOM from "react-dom";

export default function Header(props) {
    return ReactDOM.createPortal(<header className="class-Header">{props.children}</header>,document.getElementById("drawer-hook"))
}