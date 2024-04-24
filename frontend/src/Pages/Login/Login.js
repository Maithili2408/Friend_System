import React from "react";
import * as yup from "yup";
import { useState} from "react";
import '../Signup/signup.css';
import { Button } from "../../components/Button.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import { MyContext} from "../../Context.js";
import { useData } from "../../Context.js";


export function Login() {
    const [user,setUser] = useState({
        username:"",
        password:""
    })
   
    let { account,setAccount } = useData();
    
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
    
    
    const handleLogin=()=>{
        axios.get("/api/v1/account/auth",{
            params: user
          } )
        .then((res)=>{
           console.log(res.data[0]);
            if(res.data[0]){
                alert("You logged in successfully");
                setAccount([res.data[0]]);
                console.log("account",account);
                // navigate('/profile',{state:{id:res.data[0]._id}});
                navigate('/profile');
            }
            else{
                alert("Sorry, username or password is wrong");
            }
        }
         );
    }
    
    const schema = yup.object().shape({
        username:yup.string().required("email is a required field"),
        password: yup.string().required("Password is  a required field").min(8, "Password must be a minimum 8 character"),
    })

    //submit login form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                username: e.target[0].value,
                password: e.target[1].value
            };
            // console.log(formData);

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
        <div className="form-page" style={{height:"1000px",position:"fixed",width:"100%"}}>
            <div className="home-link">
              <Link to='/' className="link" style={{color:"white"}}><FontAwesomeIcon icon="fa-solid fa-arrow-left" size="2x"/><span style={{fontSize:"40px"}}>Home</span></Link>
            </div>
            <div className="lgForm">
                <div className="head">
                    WeChat
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        
                        <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="username" /><br></br>
                        {errors.username && <span className="error">{errors.username}</span>}<br></br>
                        
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" /><br></br>
                        {errors.password && <span className="error">{errors.password}</span>}<br></br>
                        <Button   label="Log in" onClick={handleLogin} style={{ backgroundColor: 'rgb(41, 176, 230)', color: 'white',height:"30px",width:"250px",alignText:"center",fontSize:"20px",border:"none",marginTop:"20px" }}/>
                    </form>
                    
                </div>
                <p><Link to='/signup'> Don't have an account? Sign up</Link></p>
            </div>
        </div>
    );
}


 