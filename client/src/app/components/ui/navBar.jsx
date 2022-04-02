import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to={"/"}>
                            Main
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/dashboard"}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/products"}>
                            ProductsList
                        </Link>
                    </li>
                </ul>
                <div className="d-flex">
                    <Link
                        className="nav-link"
                        aria-current="page"
                        to={"/login"}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
