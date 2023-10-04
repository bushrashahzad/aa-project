import React from 'react'
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';
function Login() {
  const [inputt, setInput] = useState({
    username: '',
    password: '',
  });
 
  const [error, setError] = useState({
    username: '',
    password: '',
  })

  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
  const validateInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = <div><ErrorIcon/>required</div>;
          }
          break;
 
        case "password":
          if (!value) {
            stateObj[name] = <div><ErrorIcon/>required</div>;
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }
  let navigate = useNavigate(); 
  const handleSubmit = () => {
    if (inputt.username !== '' && inputt.password !== ''){
    const url = `https://localhost:7179/api/User/Login`;
    const data = {
      "username": inputt.username,
      "password": inputt.password
    }
    axios.post(url,data)
    .then((response) => {
      console.log(response.status)
        if (response.status == 200) {
          let path = `/home`; 
          navigate(path);
          console.log("logged in");
        }
        if (response.status == 404) {
          console.log("wrong");
          toast.error("Invalid Username/Password")
        }
        
    }).catch((error) => {
      console.log("wrong");
      toast.error("Invalid Username/Password")
    })
    
  }
 else{
  if (inputt.username === '') {
    setError(prev => {
      return {
        ...prev,
        username: <div style={{marginLeft:"-5px"}}><ErrorIcon/>required</div>
      }
    })
}
 if (inputt.password === '') {
  setError(prev => {
    return {
      ...prev,
      password: <div style={{marginLeft:"-5px"}}><ErrorIcon/>required</div>
    }
  })
}
 }
}
  const log =
  <>
   <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
  }}
  noValidate
  autoComplete="off"
  >
    <form className='log' style={{backgroundSize:"300px 100px"}}> 
    <div>
    <LockPersonRoundedIcon style={{fontSize:"90px", color:"#008080", marginTop: "30px"}}/>
    </div>
    <div>
    <label className='signup'>Login</label>
    </div>
    <div>
    <TextField
   id="outlined-required"
   name="username"
    label="Username"
  style={{width:'50%',color: "#a9a9a9"}}
  value={inputt.username}
  onChange={onInputChange}
  onBlur={validateInput}/>
  <div className='red'>
{error.username && <span className='err'>{error.username}</span>}
</div>
    </div>
    <div>
    <TextField
    name="password"
    type="password"
   id="outlined-required"
    label="Password"
  style={{width:'50%',color: "#a9a9a9"}}
  value={inputt.password}
  onChange={onInputChange}
  onBlur={validateInput}/>
  <div className='red'>
{error.password && <span className='err'>{error.password}</span>}
</div>
    </div>
    <div style={{marginTop:"10px"}}>
      <label>Doesn't have an account? </label>
      <Link to="/">Sign Up</Link>
    </div>
    <Button variant="contained" style={{width:'50%',backgroundColor: "#008080", marginTop: "20px"}} onClick={() => handleSubmit()}>Login</Button>
    </form>
    </Box>
   
  </>
  return (
    <div>
      <ToastContainer/>
      {log}
    </div>
  )
}

export default Login
