import React from "react";
import '../Accounts/account.css';
import { Button } from "../../components/Button";
import { Sidenav } from "../../Layouts/Sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useData } from "../../Context";
import { useState, useEffect } from "react";


export function Account() {
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState("");

    const location = useLocation();
    const account_user = location.state.searchAccount;
    const { account, setAccount } = useData();

    //handler for follow request
    const handleFollow = () => {
        if (account_user.request_id.includes(account[0]._id)) {

        }
        else {

            axios.put(`api/v1/account/request/${account_user._id}`,
                { params: { id: account[0]._id } })
                .then(res => {
                    if (res.data) {
                        const button = document.querySelector("button");
                        button.innerHTML = "Requested"
                    }
                })
        }
    }

    useEffect(() => {
        axios.get(`/api/v1/posts/${account_user._id}`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                setPost(data);
                console.log("post", post);
            })
    }, [])

    //handler for post like
    const handleLike = (postId) => {

        axios.post(`/api/v1/posts/like/${postId}`)
            .then((response) => {
                const updatedPost = post.map((post) =>
                    post._id === postId ? response.data : post
                );
                setPost(updatedPost);

            })
            .catch((error) => console.error("Error liking post:", error));
    };

    //handler for comment post
    const handleAddComment = (postId, commentText) => {

        axios.post(`/api/v1/posts/comment/${postId}`, {
            text: commentText,
            user: account[0].username,
        })
            .then((response) => {
                const updatedPosts = post.map((post) =>
                    post._id === postId ? response.data : post
                );
                setPost(updatedPosts);
            })
            .catch((error) => console.error("Error adding comment:", error));

    };



    return (
        <>
            <Sidenav />
            <div className="profile">
                <div className="profile-container">
                    <div className="avatar">
                        <FontAwesomeIcon icon="fa-regular fa-user" size="6x" className="icon1" />
                    </div>


                    <div className="bio">
                        <span style={{ fontSize: "30px" }}><b>{account_user.username}</b></span>
                        <h3>{account_user.bio}</h3>
                        <span><h3>{account_user.friend_id.length} friends</h3></span>
                        <span><Button onClick={handleFollow} id="button" label={(account_user.request_id.includes(account[0]._id)) ? "Requested" : ((account[0].friend_id.includes(account_user._id))) ? "following" : "Send Request"}
                            style={{ backgroundColor: 'rgb(41, 176, 230)', color: 'white', height: "30px", width: "150px", alignText: "center", fontSize: "15px", border: "none" }} /></span>

                    </div>
                </div>
            </div>
            <div className="post-container">
                <FontAwesomeIcon icon="fa-solid fa-table-cells" size="1x" />
                <span style={{ fontWeight: "600", fontSize: "20px" }}>Posts</span>

                {((account_user.privacy === "public") || (account_user.privacy === 'private' && account_user.friend_id.includes(account[0]._id))) ?
                    <>

                        {post.map((post) => (

                            <div>
                                <div className="left">
                                    <img src={`http://localhost:3000/uploads/${post.file}`} alt="post" className="post-image"></img>
                                </div>
                                <div className="right" >
                                    <span style={{ color: "deeppink" }}><FontAwesomeIcon icon="fa-solid fa-heart" size="xx" style={{ Color: "red" }} /></span>
                                    <span style={{ fontSize: "25px", marginLeft: "20px" }}>{post.likes} likes</span>
                                    <Button label="Like" onClick={() => handleLike(post._id)} style={{ fontSize: "20px", border: "1px solid red", alignText: "center", padding: "5px 10px 5px 10px", color: "white", marginLeft: "50px", backgroundColor: "deeppink" }} />
                                    <h2 style={{ fontWeight: "600" }}>Comments</h2>
                                    <div className="scroll-sm">

                                        {post.comments.map((comment, index) => (
                                            <div>
                                                <span style={{ fontSize: "10px" }}>{comment.user}</span>
                                                <p key={index} style={{ backgroundColor: "whitesmoke" }}>{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="text" onChange={(e) => setComment(e.target.value)} placeholder="Add a comment"></input>
                                    <Button label="add" onClick={() => handleAddComment(post._id, comment)} style={{ height: "30px", color: "deeppink", backgroundColor: "white", alignText: "center", border: "none" }} />
                                </div>
                            </div>

                        ))}
                    </> :
                    <div>
                        <h1>This account is private</h1>
                        <p>Follow to see their photos</p>
                    </div>
                }


            </div>

        </>
    );
}



