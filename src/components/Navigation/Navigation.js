import React from "react";
import { NavLink } from "react-router-dom";
import "../Navigation/Navigation.css"

const Navigation = () => {

    return (
        <nav className="menu">
            <ul className="menu__list">
                <div className="menu_link">

                    <NavLink to="/" >Articles</NavLink>
                </div>
                <div className="menu_link">
                    <NavLink to="users" >Users</NavLink>
                </div>
                <div className="menu_link">
                    <NavLink to="photos">Photos</NavLink>
                </div>
            </ul>
        </nav>
    )
}

export default Navigation