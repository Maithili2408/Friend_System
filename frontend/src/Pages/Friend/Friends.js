import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidenav } from "../../Layouts/Sidenav";
import '../Friend/friend.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { useData } from "../../Context";


export function Friends() {
  const [friends, setFriend] = useState([]);
  const { account, setAccount } = useData();
 
  //list out all friends of user
  useEffect(() => {
    axios.get(`api/v1/account/friends/${account[0]._id}`)
      .then(response => {
        return response.data;
      })
      .then(data => {
        setFriend(data);
      })
  }, [friends])

  return (
    <>
      <Sidenav />
      <h1 className="friend-header">Friends</h1>
      {friends.length > 0 ?
        <>

          {friends.map((user) => (
            <div className="friends">
              <div className="friend-info"> <FontAwesomeIcon icon="fa-regular fa-user" size="6x" className="icon1" /></div>
              <div className="friend-info"><p className="username">{user.username}</p><p>{user.bio}</p>
              </div>
            </div>
          ))}

        </> :
        <div className="msg">
          <p>You don't have any friends yet.</p>
          <p>Start following other users to make friends and build your network!</p>
        </div>}
    </>
  );
}