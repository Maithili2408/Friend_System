import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Layouts/sidenav.css';
import { useData } from "../Context";
export function Sidenav() {
  let { account,setAccount } = useData();
  let userid = {
    id:account[0]._id
  }
  return (
    <>
      <div>
        <div className="sidenav">
          <h1>WeChat</h1>
          <p><Link to='/profile' className="nav1"  ><FontAwesomeIcon icon="fa-solid fa-user" title="Profile" /><span className="link-title">  Profile</span></Link></p><br></br>
          <p><Link className="nav1"><FontAwesomeIcon icon="fa-solid fa-message" title="Messages" /><span className="link-title"> Messages</span></Link></p><br></br>
          <p><Link className="nav1" to='/dashboard'><FontAwesomeIcon icon="fa-solid fa-search" title="search" /><span className="link-title"> Search</span></Link></p><br></br>
          <p><Link className="nav1" to={{ pathname: '/notifications', state: userid }} ><FontAwesomeIcon icon="fa-solid fa-heart" title="Notifications" /> <span className="link-title">Notifications</span></Link></p><br></br>
          <p> <Link className="nav1" to='/friends'><FontAwesomeIcon icon="fa-solid fa-users" title="Friends" /><span className="link-title"> Friends</span></Link></p><br></br>
          <p><Link className="nav1" to='/login'><FontAwesomeIcon icon="fa-solid fa-arrow-left" title="Log out" /><span className="link-title"> Log out</span></Link></p><br></br>

        </div>
      </div>
    </>
  );
}