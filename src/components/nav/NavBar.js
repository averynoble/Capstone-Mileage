import React from "react"
import { Link } from "react-router-dom"

export const NavBar = (props) => {

    return (
        <nav className="navbar">
            <ul className="nav">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/vehicles/create">New Vehicle</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/login" onClick={() => sessionStorage.removeItem("miles_user")}>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}