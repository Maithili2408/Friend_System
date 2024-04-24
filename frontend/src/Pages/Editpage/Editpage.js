import React from "react";
import { Sidenav } from "../../Layouts/Sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../components/Button";
import { useState } from "react";
import axios from "axios";
import { useData } from "../../Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../Editpage/editpage.css';


export function Editpage() {

    const [editData, setEditData] = useState({
        image: "",
        username: "",
        bio: "",
        privacy: "",
    })
    const { account, setAccount } = useData();
    const user_id = account[0]._id;
    const navigate = useNavigate();

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setEditData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })
    }

    //handler for edit profile
    const handleEdit = (event) => {
        axios.put(`/api/v1/account/update/${user_id}`, editData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                alert("Successfully updated profile");
                // setEditData(null);
                navigate('/profile');
            })
        event.preventDefault();
    }
    return (
        <>
            <Sidenav />
            <div className="editpage">
                <h1>Edit profile</h1>

                <form>
                    <label><big><b>Username</b></big></label>
                    <input type="text" name="username" className="bio-text" value={editData.username} onChange={handleChange}></input><br></br>
                    <label><big><b>Bio</b></big></label><br></br>
                    <textarea name="bio" value={editData.bio} onChange={handleChange} className="bio-text"></textarea>
                    <label>
                        Account Privacy:
                        <select name="privacy" value={editData.privacy} onChange={handleChange}>
                            <option defaultValue disabled>
                                Select Privacy option
                            </option>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </label><br></br>

                    <Button onClick={handleEdit} label="Submit" style={{ color: "white", backgroundColor: "rgb(41, 176, 230)", height: "45px", width: "200px", textAlign: "center", fontSize: "20px", border: "none", borderRadius: "25px", marginTop: "30px" }} />
                </form>
            </div>

        </>
    );
}