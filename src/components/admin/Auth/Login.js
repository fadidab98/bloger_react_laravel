import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert";
import Cookies from "js-cookie";
import './Login.css'
export default function Login() {
  const history = useHistory();

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    
   
  });
  const [error_message,setError_message]=useState({
    email:'',
    password:''
  });
  const [block,setBlock]=useState('')
  const inputHandler = (e) => {
    e.persist();
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const LoginForm = (e) => {
    e.preventDefault();
    const data = {
      email: inputData.email,
      password: inputData.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", data).then((res) => {
        if (res.data.status == 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          localStorage.setItem("auth_image", res.data.image);
          Cookies.set("id", res.data.userId);
         
            if(res.data.role == 'admin')
            {
              history.push("/admin/dashboard");
            }
            else{
              history.push("/moderator/dashboard");
            }
         
         
         
          Swal("Success", res.data.message, "success");
        }
        else if (res.data.status == 400){
          setBlock(  res.data.block_message );
        }
        else if (res.data.status == 401) {
          Swal("Warning", res.data.message, "warning");
        } else {
          setError_message({ ...error_message, email: res.data.message_error.email,password: res.data.message_error.password });
        }
        setInputData({
          email: "",
          password: "",
        });
      });
    });
  };

  return (
    <div id="login">
      <img id="login_img" src="/uploads/Massaha/1.png"/>
      <div id="login_div" >
        
            <div className="card w-md-75">
              <div className="card-header">Log in </div>
              <div className="card-body">
              <p className="text-center text-danger">{block}</p>
                <form onSubmit={LoginForm}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={inputData.email}
                      onChange={inputHandler}
                      className="form-control"
                      placeholder="Enter Your Email"
                    />
                  {(error_message.email)?<p className="text-danger">{error_message.email}</p>:''}  
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={inputData.password}
                      className="form-control"
                      onChange={inputHandler}
                      required
                      placeholder="Enter Your Password"
                    />
                  {(error_message.password)?<p className="text-danger">{error_message.password}</p>:''}    
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary">Log In</button>
                  </div>
                </form>
              </div>
            </div>
          
      </div>
    </div>
  );
}
