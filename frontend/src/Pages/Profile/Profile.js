import React from "react";
import { Sidenav } from "../../Layouts/Sidenav";
import { Button } from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Profile/profile.css';
import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Context.js";

export function Profile() {
    const [newPost, setNewPost] = useState({
        file: null,
     });
     
     const [file,setFile]=useState([]);

    let { account, setAccount } = useData();
    const id = account[0]._id;
    console.log(id);
     const navigate= useNavigate();

     const handleFileChange = (event) => {

        setNewPost({ ...newPost, file: event.target.files[0] });
        console.log(event.target.files[0]);
    };

    //handler for submit post
    const handlePostSubmit = (event) => {
        const formData = new FormData();
        formData.append("file", newPost.file);
          
        axios.post(`/api/v1/posts/${account[0]._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then((response) => {
            console.log(response);
            setNewPost({ file: null });
          })
          .catch((error) => console.error("Error creating post:", error));
          event.preventDefault();

         };

    
        //to get all posts of login user
         useEffect(()=>{
            axios.get(`/api/v1/posts/${account[0]._id}`)
            .then(response => {
                return response.data;
              })
              .then(data => {
                setFile(data);
        
              })
         },[newPost])

     useEffect(()=>{
        axios.get(`/api/v1/account/info/${id}`)
        .then((res)=>{
             setAccount([res.data]);
        })
     },[])

    
    const handleEditProfile=()=>{
            navigate('/edit-profile');
    }
   
    return (
        <>
            <Sidenav />
            <div className="profile">
                <div className="profile-container">
                    <div className="avatar">
                    <FontAwesomeIcon icon="fa-regular fa-user" size="6x" className="icon1"/>
                    </div>

                   
                        <div className="bio">
                        <h2>{account[0].username}</h2>
                        
                        <h3>{account[0].bio}</h3>
                         <h3>{account[0].friend_id.length} friends</h3> 
                    </div>

                  
                </div>
               
                <div className="setting">
                    <div className="setting-item">
                    <form   enctype="multipart/form-data">
                        <label for="image">
                            <FontAwesomeIcon icon="fa-solid fa-plus" size="3x" className="icon" />
                            <br></br> New Post
                            <input id="image" type="file"  name="file" onChange={handleFileChange}/>
                        </label><br></br>
                        <Button label="upload"  onClick={handlePostSubmit} style={{padding:"5px 10px 5px 10px",fontSize:"15px"}}/>
                        </form>
                    </div>


                    <div className="setting-item">
                        <Button   onClick={handleEditProfile} label="Edit profile" style={{ backgroundColor: "rgb(199, 197, 197)", color: "black", height: "40px", width: "100px", fontSize: "15px", alignText: "center", border: "none", borderRadius: '25px' }} />
                    </div>
                    
                </div>
            </div>
            
            <div className="post-container">
                <FontAwesomeIcon icon="fa-solid fa-table-cells" size="1x" />
                <span style={{ fontWeight: "600", fontSize: "20px" }}>Posts</span>
                
                {file.map((post)=>(
                    <div >
                        <div className="left">
                        <img  src={`http://localhost:3000/uploads/${post.file}`} alt="post" className="post-image"></img>
                        </div>
                        <div className="right">
                        <FontAwesomeIcon icon="fa-solid fa-heart" size="xx" style={{color:"deeppink"}} />
                        <span style={{fontSize: "25px",marginLeft:"20px"}}>{post.likes} likes</span>
                         <h2 style={{fontWeight:"600"}}>Comments</h2>
                           <div className="scroll">
                              {post.comments.map((comment,index)=>(
                                <div>
                                <span style={{fontSize:"10px"}}>{comment.user}</span>
                                 <p key={index} style={{backgroundColor:"rgb(249, 235, 249)",marginTop:"0px"}}>{comment.text}</p>
                                 </div>
                               ))}
                           </div> 
                        </div>
                        </div>
                ))}
               

            </div>
        </>
    );
}