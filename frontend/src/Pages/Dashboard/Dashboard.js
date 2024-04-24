import React from "react";
import { Sidenav } from "../../Layouts/Sidenav";
import { Button } from "../../components/Button";
import { useState, useEffect } from "react";
import '../Dashboard/dashboard.css';
import axios from "axios";
import { useData } from "../../Context";
import { useNavigate } from "react-router-dom";

export function Dashboard({ user }) {
  const [users, setUsers] = useState([])
  const { account } = useData();
  let [searchData, setSearchData] = useState("");
  let [searchAccount, setSearchAccount] = useState([]);
  const navigate = useNavigate();



  const handleChange = (e) => {
    let value = e.target.value;
    setSearchData(searchData = value)
  }

  //handler for search user
  const handleSearch = () => {
    const params = {
      username: searchData
    }

    axios.get('/api/v1/account/search', { params })
      .then((res) => {
        if (res.data[0]) {
          setSearchAccount(searchAccount = res.data[0]);
          navigate('/user-account', { state: { searchAccount } })
        }
        else {
          alert("no such user");
        }
      })
  }



  return (
    <>
      <div className="dashboard">
        <Sidenav />
        <div className="search-container">
          <h1>Search</h1>
          <input className="search-input" type="text" name="searchData" value={searchData} onChange={handleChange} placeholder="Search..."></input><Button onClick={handleSearch} label="search" style={{ height: "30px", fontWeight: "bold", padding: "5px 10px 5px 10px" }} />
        </div>
        <br></br>
      </div>
    </>
  );
}

