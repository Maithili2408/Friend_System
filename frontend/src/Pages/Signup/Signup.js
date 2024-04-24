import React from "react";
import * as yup from "yup";
import { useState } from "react";
import axios from 'axios';
import '../Signup/signup.css';
import { Button } from "../../components/Button.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";



export function Signup() {

    const [user,setUser] = useState({
        email:"",
        mobileno:"",
        name: "",
        username:"",
        dob:"",
        password:""
    })

    const [errors, setErrors] = useState({});
    const navigate= useNavigate();

    const handleChange=(e)=>{
        let value = e.target.value;
        let name = e.target.name;
     
        setUser((prevalue) => {
          return {
            ...prevalue,   // Spread Operator               
            [name]: value
          }
        })
    }
    const handleRegister=()=>{
        axios.post("/api/v1/account",user )
        .then((res)=>{
            let condition=parseInt(res.data);
            if(condition===1){
                alert("Account created successsfully");
                navigate('/login');
                setUser({});
            }
            if(condition===0){
                alert("User already exist");
            }
        }
         );
    }

    const schema = yup.object().shape({
        email:yup.string().email("email must be a valid").required("email is a required field"),
        mobileno: yup.number().required("mobile number is a required field").min(10,"mobile must be a minimum 10 character"),
        name: yup.string().required("name is a required field").min(2),
        dob: yup.string().required("DOB is a required field"),
        username: yup.string().required("username is a required field").min(2),
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                email: e.target[0].value,
                mobileno: e.target[1].value,
                name: e.target[2].value,
                dob: e.target[3].value,
                username: e.target[4].value,
            };
            console.log(formData);

            await schema.validate(formData, { abortEarly: false });

        } catch (validationError) {

            const errors = {};
            validationError.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            setErrors(errors);
        }
    };
    
    return (
        <div className="form-page">
            <div className="home-link">
              <Link to='/' className="link" style={{color:"white"}}><FontAwesomeIcon icon="fa-solid fa-arrow-left" size="2x"/><span style={{fontSize:"40px"}}>Home</span></Link>
            </div>
            <div className="lgForm">
                <div className="head">
                    WeChat
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" value={user.email}  onChange={handleChange} placeholder="Email" /><br></br>
                        {errors.email && <span className="error">{errors.email}</span>}<br></br>
                        
                        <input type="text" name="mobileno" value={user.mobileno}  onChange={handleChange} placeholder="Mobile Number" /><br></br>
                        {errors.mobileno && <span className="error">{errors.mobileno}</span>}<br></br>
                        
                        <input type="text" name="name" value={user.name}  onChange={handleChange} placeholder="Name" /><br></br>
                        {errors.name && <span className="error">{errors.name}</span>}<br></br>
                        
                        <input type="date" name="dob" value={user.dob}  onChange={handleChange} placeholder="Date of birth"/><br></br>
                        {errors.dob && <span className="error">{errors.dob}</span>}<br></br>
                        
                        <input type="text" name="username" value={user.username}  onChange={handleChange} placeholder="Username" /><br></br>
                        {errors.username && <span className="error">{errors.username}</span>}<br></br>
                        
                        <input type="password" name="password" value={user.password}  onChange={handleChange} placeholder="Password" /><br></br>
                      
                        <Button   label="Sign up" onClick={handleRegister} style={{ backgroundColor: 'rgb(41, 176, 230)', color: 'white',height:"30px",width:"250px",alignText:"center",fontSize:"20px",border:"none",marginTop:"20px" }}/>
                    </form>
                    
                </div>
                <p><Link to='/login'>Have an account? Log in</Link></p>
            </div>
        </div>
    );
}

