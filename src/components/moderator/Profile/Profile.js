import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Profile.css'

function Profile() {
    const history = useHistory();
    const [inputData,setInputData]=useState({
        name:'',
        email:'',
        image:'',
        error_message:[]

    
    })
    const [loading,setLoading]=useState(true);
    const id = Cookies.get('id');
    const [refresh,setRefresh]=useState(0);

    const [password,setPassword] = useState({
      oldPassword:'',
      newPassword:''
    });
    useEffect(()=>{
        axios.get(`/api/show-user/${id}`).then(res=>{
            if(res.data.status==200)
            {
                setInputData({...inputData,name:res.data.data.name,email:res.data.data.email,image:res.data.data.image})
                setLoading(false);
            }
        })
    },[refresh])
    const [picture, setPecture] = useState( {image:inputData.image} );
    function refreshPage(){
        setRefresh(...refresh+1)
    }
    const inputHandler=(e)=>{

        setInputData({...inputData,[e.target.name]:e.target.value})
       }

const inputImage = (e) => {
    setPecture({ image: e.target.files[0] });
  };
  const passwordHandler=(e)=>{

    setPassword({...password,[e.target.name]:e.target.value})
   }
    function submitdata(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", inputData.name);
        formData.append("email", inputData.email);
        formData.append("image", picture.image);
        formData.append("id", id);
         
   console.log(formData)
        axios.post(`/api/profile-user/${id}`,formData).then(res=>{
            if (res.data.status === 200) {
              
          
                localStorage.setItem('auth_name', inputData.name);
                
                toast.success(res.data.message);
              }else if(res.data.status ==400)
              {
                  localStorage.removeItem("auth_token");
                  localStorage.removeItem("auth_name");
                  Cookies.remove("id");
                 
                  history.push("/login");
                  window.location.reload();
        
              }else {
                setInputData({ ...inputData, error_message: res.data.message_error });
                toast.error(res.data.error_message);
                console.log(inputData.error_message);
              }
            });
     
       
    }
   function changePassword(e){
     e.preventDefault();
     const passworddata={
       oldPassword:password.oldPassword,
       newPassword:password.newPassword
     }
     axios.post(`/api/change-password-user/${id}`,passworddata).then(res=>{
       if(res.data.status ==200)
       {
        toast.success(res.data.message)
       }else{
        toast.warning(res.data.error_message)
       }
     })

   }
  return (
    <div className="card m-0 p-0">
    <div className="card-header">
      <div className="d-flex justify-content-between align-items-center">
        <div aria-label="breadcrumb bg-light">
          <ol className="breadcrumb p-0 m-0 bg-light ">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Profile
            </li>
          </ol>
        </div>
       
      </div>
    </div>
    <div className="card-body" >
        <div className='card'>
            <div className='card-body' >
                <form onSubmit={submitdata} encType="multipart/form-data" className="form_data" >
    <table className="table table-light striped"  >
  
  <tbody>
  <tr>
      <td>Name:</td>
      <td style={{minWidth:'20rem'}}>{inputData.name}</td>
      <td><input type="text" name="name" onChange={inputHandler} className="form-control" value={inputData.name} placeholder="Change Your Name"/></td>
    </tr>
    <tr>
      <td>Email:</td>
      <td style={{minWidth:'20rem'}}>{inputData.email}</td>
      <td><input type="text" name="email" onChange={inputHandler} className="form-control" value={inputData.email} placeholder="Change Your Email"/></td>
    </tr>
    <tr>
      <td>Image:</td>
      <td style={{minWidth:'20rem'}}>{inputData.image?<img style={{width:'5rem',height:'4rem'}} src={`/uploads/admin/user-image/${inputData.image}`}/>:'No Image' }</td>
      <td><input type="file"  name="image" onChange={inputImage} className="form-control" placeholder="Change Your Image"/></td>
    </tr>
   
  </tbody>

</table>
<div className='text-center'><button onClick={refreshPage} className='btn btn-primary'>Save</button></div>
</form>
<hr/>
<form onSubmit={changePassword} className="form_data">
<table className="table table-light striped" >
<tr>
      <td>Password:</td>
      <td>
        <input name="oldPassword" onChange={passwordHandler} value={password.oldPassword} type="password" className="form-control" placeholder="Old Password"/>
        
      </td>
      <td><input name="newPassword" onChange={passwordHandler} value={password.newPassword} type="password" className="form-control" placeholder="New Password"/></td>
    </tr>
   
</table>
<div className='text-center'><button className='btn btn-primary'>Save Password</button></div>
</form>
    </div>
    </div>
        </div>
    </div>
  )
}

export default Profile