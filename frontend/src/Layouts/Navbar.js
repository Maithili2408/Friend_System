import React from "react";
import '../Layouts/Navbar.css';
import { Link } from "react-router-dom";

export function Navbar(){
    return(
        <>
            <div className="nav">
                <div className="sub-nav"  id="nav-logo">
                    WeChat
                </div>
                <div className="sub-nav">
                     <ol className="nav-items">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/'>About us</Link></li>
                        <li><Link to='/signup'>Sign up</Link></li>
                        <li><Link to='/login'>Log in</Link></li>
                     </ol>
                </div>
            </div>
        </>
    );
}