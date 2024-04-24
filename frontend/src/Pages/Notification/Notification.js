import React from "react";
import { Button } from "../../components/Button";
import { Sidenav } from "../../Layouts/Sidenav";
import '../Notification/notification.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { useData } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export function Notification(props) {
  let { account, setAccount } = useData();
  let id = account[0]._id;
  let [requestedUser, setRequestedUser] = useState([]);

  //to get all user who send request
  useEffect(() => {

    axios.get(`api/v1/account/requestedUser/${id}`)
      .then(response => {
        return response.data;
      })
      .then(data => {
        setRequestedUser(data);

      })
  }, [requestedUser])


  //handler for accept request
  const handleAcceptRequest = async (index) => {

    console.log(index);
    let friend_id = requestedUser[index]._id;

    try {
      axios.put(`api/v1/account/accept_request/${account[0]._id}`,
        { params: { id: friend_id } }).then((res) => {
          alert(`you are now friend with ${requestedUser[index].username}`);
          setAccount([...account, res.data]);
        }).catch((error) => console.log(error.message))
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Sidenav />
      <div>
        <h1 className="notification-header"><b>Notifications</b></h1>
        {requestedUser.length > 0 ?
          <>
            {requestedUser.map((user, index) => (

              <div className="notification" key={index}>
                <div className="notify">  <FontAwesomeIcon icon="fa-regular fa-user" size="6x" className="icon1" /></div>
                <div className="notify"><p className="usernm">{user.username}</p><p>{user.bio}</p></div>
                <div className="notify" ><Button onClick={() => handleAcceptRequest(index)} id="button" label={(account[0].friend_id.includes(user._id)) ? "Following" : 'Accept'} style={{ backgroundColor: 'rgb(41, 176, 230)', color: 'white', height: "30px", width: "150px", alignText: "center", fontSize: "15px", border: "none", margin: "1vw 0 0 3vw", float: "right" }} /></div>
              </div>
            )
            )}
          </> :
          <div>
            <p>You have no new notifications at the moment. Stay tuned for updates!</p>
          </div>}
      </div>

    </>
  );
}