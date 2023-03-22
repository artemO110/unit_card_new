import React from "react";
import Navigation from "../Navigation/Navigation";
import "../header/Header.css"

const Header = () => {
    return (
        <div className="header">
            <p>React Example</p>
            <Navigation />
        </div>
    )
}

export default Header