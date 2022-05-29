import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import "./AddForm.css";
import axios from "axios";
import Cookies from "js-cookie";

toast.configure();
function Edit(props) {
  const {id}=useParams();
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState({
    data:[]
  });
  const history = useHistory();
    const userId = Cookies.get("id");
  const [inputData, setInputData] = useState({
    name: props.data.name,
    image: props.data.image,
    email: props.data.email,
    status:props.data.status,
    

   
    
    error_message: [],
  });
  const [role, setRole] = useState(props.data.role_as);
  const [status, setStatus] = useState(props.data.status);
 
  const [picture, setPecture] = useState({ image: props.data.image });
  const inputHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const radioHandler = (e) => {
    setStatus(e.target.value);
  };
  const radioRoleHandler = (e) => {
    setRole(e.target.value);
  };

  const inputImage = (e) => {
    setPecture({ image: e.target.files[0] });
  };



  console.log(category)
  const submitForm = (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("status", status);
    formData.append("role", role);
    formData.append("image", picture.image);
    formData.append("id", id);
    axios.post(`api/edit-user/${userId}`, formData).then((res) => {
      if (res.data.status === 200) {
        setModal(true);
        props.closeModalFunction();
  
        localStorage.setItem('auth_name', inputData.name);
        window.location.reload();
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
   
  };

  return (
    <form onSubmit={submitForm} encType="multipart/form-data">
    <div className="form-outline">
      <label className="form-label" htmlFor="Name">
        User Name
      </label>
      <input
        type="text"
        id="Name"
        name="name"
        value={inputData.name}
        onChange={inputHandler}
        className="form-control"
      
      />
      <p className="text-danger">
        {inputData.error_message ? inputData.error_message.name : ""}
      </p>
    </div>
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3ExampleEmail">
        Email
      </label>
      <input
        id="form3ExampleEmail"
        className="form-control"
        name="email"
        value={inputData.email}
        onChange={inputHandler}
      />
      <p className="text-danger">
        {inputData.error_message ? inputData.error_message.email : ""}
      </p>
    </div>
 
    <div className="d-flex mt-2 ">
      <label className="pe-3">Status :</label>
      { inputData.status ==1 ?( <div className="mx-4">
        <input
          className="form-check-input me-3"
          type="radio"
          value="1"
          onChange={radioHandler}
          id="flexRadioDefault1"
          name="status"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
        Unblocked
        </label>
      </div>):( <div className="mx-4">
        <input
          className="form-check-input me-3"
          type="radio"
          value="1"
          onChange={radioHandler}
          id="flexRadioDefault1"
          name="status"
          
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
        Blocked
        </label>
      </div>)}
      { inputData.status ==0?( <div className="mx-4">
        <input
          className="form-check-input"
          type="radio"
          onChange={radioHandler}
          value="0"
          id="flexRadioDefault2"
          name="status"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
        Unblocked
        </label>
      </div>):(<div className="mx-4">
        <input
          className="form-check-input"
          type="radio"
          onChange={radioHandler}
          value="0"
          id="flexRadioDefault2"
          name="status"
          
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
        Blocked
        </label>
      </div>)}
     
    </div>
    <div className="d-flex mt-2 ">
      <label className="pe-3">Role :</label>
      {role ==1 ?(<div className="mx-4">
     
     <input
       className="form-check-input me-3"
       type="radio"
       value="1"
       onChange={radioRoleHandler}
       id="flexRadioDefault1"
       name="role"
       defaultChecked
     />
     <label className="form-check-label" htmlFor="flexRadioDefault1">
       Admin
     </label>
   </div>):(<div className="mx-4">
     
     <input
       className="form-check-input me-3"
       type="radio"
       value="1"
       onChange={radioRoleHandler}
       id="flexRadioDefault1"
       name="role"
       
     />
     <label className="form-check-label" htmlFor="flexRadioDefault1">
       Admin
     </label>
   </div>)}
      {role ==0?(  <div className="mx-4">
        <input
          className="form-check-input"
          type="radio"
          onChange={radioRoleHandler}
          value="0"
          id="flexRadioDefault2"
          name="role"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Modorator
        </label>
      </div>):(  <div className="mx-4">
        <input
          className="form-check-input"
          type="radio"
          onChange={radioRoleHandler}
          value="0"
          id="flexRadioDefault2"
          name="role"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Modorator
        </label>
      </div>)}
    
    </div>

    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3Example4">
        Image
      </label>
      <input
        type="file"
        name="image"
        onChange={inputImage}
        id="form3Example4"
        dir="rtl"
        className="form-control"
      />
      <p className="text-danger">
        {inputData.error_message ? inputData.error_message.image : ""}
      </p>
      <div className="d-flex justify-content-center" >
          <img className="w-50" src={`/uploads/admin/user-image/${inputData.image}`}/>
        </div>
    </div>
  
    <div className="modal-footer border-0">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={props.closeModalFunction}
      >
        Close
      </button>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </div>
  </form>
  );
}

export default Edit;
