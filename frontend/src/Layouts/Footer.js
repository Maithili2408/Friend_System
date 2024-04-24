import React from "react";
import '../Layouts/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export function Footer(){
    return(
        <>
           <div className="footer">
            <div className="sub-footer">
                <h3>About us</h3>
                 <div className="about-footer">WeChat is a social media application. we can make friends through this by sending friend request. we also can choose 
                 to whose friend request to accept or decline. you can chat with friends through this. you can share your memories ,happy moments
                 with friends by posting photos.</div>
            </div>
            <div className="sub-footer">
                <h3>Contact us</h3>
                
                <FontAwesomeIcon icon="fa-solid fa-phone"/><span> (+91)984 345 1002</span><br></br>
                <FontAwesomeIcon icon="fa-solid fa-envelope"/><span> friendsystem21@gmail.com</span>

            </div>
           </div>
        </>
    );
}

// ReactDOM.render( document.body)