import React from "react"
import { Link } from "react-router-dom"

export const NavBar = (props) => {
    return (
        <nav className="navbar">
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/vehicles">New Vehicle</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/friends">Find Users</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}