import React from "react";
import { Navbar} from '../../Layouts/Navbar'
import {Footer} from "../../Layouts/Footer";
import '../Home/Home.css';

export function Home(){
    return(
        <>
            <Navbar/>
            <div className="container" >
                <div className="item1"><p>Expand your friend circle</p></div>
                <div className="item1"><img className="img1" src={require('../../Assets/img2.jpg')} alt="img1"></img></div>
            </div>
            <div className="container">
                <div className="item1"><img className="img1" src={require('../../Assets/img4.jpg')} alt="img2"></img></div>
                <div className="item1"><p>Share memories with your friends</p></div>
            </div>
            <Footer/>
        </>
    );
}
