import React from 'react';
import {useState, useEffect} from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';

function Register() {
  const [register,setRegister] = useState([]);
  const currentDate = new Date();
  let navigate = useNavigate(); 
  const [inputt, setInput] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
 
  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: ''
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
        case "firstname":
          if (!value) {
            stateObj[name] = <div><ErrorIcon/>required</div>;
          }
          break;

          case "lastname":
            if (!value) {
              stateObj[name] = <div><ErrorIcon/>required</div>;
            }
            break;

        case "username":
          if (!value) {
            stateObj[name] = <div><ErrorIcon/>required</div>;
          }
          break;
 
        case "password":
          if (!value) {
            stateObj[name] = <div><ErrorIcon/>required</div>;
          } else if (inputt.confirmPassword && value !== inputt.confirmPassword) {
            stateObj["confirmPassword"] = <div style={{marginLeft:"200px"}}>Password and Confirm Password does not match</div>;
          } else {
            stateObj["confirmPassword"] = inputt.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = <div><ErrorIcon/>required</div>;
          } else if (inputt.password && value !== inputt.password) {
            stateObj[name] = <div style={{marginLeft:"200px"}}>Password and Confirm Password does not match</div>;
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }

const getData = () => {
  axios.get('https://localhost:7179/api/User')
  .then(result => {
      setRegister(result.data)
  })
  .catch((error) => {
      console.log(error)
  })
}

useEffect(() => {
getData();
}, [])


const clear = () => {
  onInputChange('');
}

const handleSubmit = () => {
  if(inputt.firstname !=='' && inputt.lastname !== '' && inputt.username !=='' && inputt.password !=='' && inputt.confirmPassword !== '' && inputt.password === inputt.confirmPassword){
    const url = "https://localhost:7179/api/User/Register";
    const data = {
    "firstName": inputt.firstname,
    "lastName": inputt.lastname,
    "username": inputt.username,
    "password": inputt.password,
    "date": currentDate.toDateString()
    }
  
    axios.post(url,data)
    .then((result) => {
        getData();
        clear();
    }
    ).catch((error) => {
    toast.success(error)
  })
  toast.success("Registered");
  let path = `/home`; 
      navigate(path);
  }
  else{
    if (inputt.firstname === ''){
      setError(prev => {
        return {...prev,
        firstname: <div style={{marginLeft:"-5px"}}><ErrorIcon/>required</div>,
        }
      })
      }
      if (inputt.lastname === '') {
        setError(prev => {
          return {
            ...prev,
            lastname: <div style={{marginLeft:"-5px"}}><ErrorIcon/>required</div>
          }
        })
    }
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
if (inputt.confirmPassword === '') {
  setError(prev => {
    return {
      ...prev,
      confirmPassword: <div style={{marginLeft:"-5px"}}><ErrorIcon/>required</div>
    }
  })
}   
  }

}

  const Reg = 
  <>
  <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
  }}
  noValidate
  autoComplete="off"
  >
   
    <form className='reg' style={{backgroundSize:"300px 100px"}}> 
    <div>
    <HowToRegRoundedIcon style={{fontSize:"100px", color:"#008080"}}/>
    </div>
    <div>
    <label className='signup'>Sign Up</label>
    </div>
  <div>
  <TextField
  required
   id="outlined-required"
    label="First Name"
    name= "firstname"
  style={{width:'50%',color: "#a9a9a9"}}
  value={inputt.firstname}
  onChange={onInputChange}
  onBlur={validateInput}></TextField>
  <div className='red'>
{error.firstname && <span className='err'>{error.firstname}</span>}
</div>
    </div>
    <div>
    <TextField
    required
   id="outlined-required"
    label="Last Name"
  style={{width:'50%',color: "#a9a9a9"}}
  value={inputt.lastname}
  name='lastname'
  onChange={onInputChange}
  onBlur={validateInput}
 />
  
  <div className='red'>
{error.lastname && <span className='err'>{error.lastname}</span>}
</div>
    </div>
    <div>
    <TextField
    required
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
    required
    type="password"
   id="outlined-required"
   name="password"
    label="Password"
  style={{width:'50%',color: "#a9a9a9"}}
  value={inputt.password}
  onChange={onInputChange}
  onBlur={validateInput}/>
  <div className='red'>
{error.password && <span className='err'>{error.password}</span>}
</div>
    </div>
    <div>
    <TextField
    required
    type="password"
    name="confirmPassword"
   id="outlined-required"
    label=" Confirm Password"
  style={{width:'50%',color: "#a9a9a9"}}
  value={inputt.confirmPassword}
  onChange={onInputChange}
  onBlur={validateInput}/>
  <div className='red'>
{error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
</div>
    </div>
    <div style={{marginTop:"10px"}}>
      <label>Already have an account? </label>
      <Link to="/login">Login</Link>
    </div>
    <Button variant="contained" style={{width:'50%',backgroundColor: "#008080", marginTop: "20px"}} onClick={() => handleSubmit()}>Sign Up</Button>
    </form>
    </Box>
    
    </>
    
  return (
    <div>
      <ToastContainer/>
      {Reg}
    </div>
  )
}

export default Register
