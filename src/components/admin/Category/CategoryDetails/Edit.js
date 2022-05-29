import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import "./AddForm.css";
import axios from "axios";
import Cookies from "js-cookie";

toast.configure();
function Edit(props) {
 
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState({
    data:[]
  });
  const history = useHistory();
    const id = Cookies.get("id");
  const [inputData, setInputData] = useState({
    name: props.data.name,
    description: props.data.description,
   
    
    error_message: [],
  });
  const handelCkeditor =(event,editor)=>{
    const dataEditor = editor.getData();
    setInputData({...inputData, description: dataEditor})
    // console.log(dataEditor);
  }
  const [status, setStatus] = useState(props.data.status);
  const [picture, setPecture] = useState({ image: props.data.image });
  
  const inputHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const radioHandler = (e) => {
    setStatus(e.target.value);
  };
  var defaultChecked = (props.data.status === "1" ) ? 'defaultChecked' : 'false';
  var defaultChecked0 = (props.data.status === "0" ) ? 'defaultChecked' : 'false';
 
  const inputImage = (e) => {
    setPecture({ image: e.target.files[0] });
  };



  console.log(category)
  const submitForm = (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("description", inputData.description);
    formData.append("status", status);
   
    formData.append("image", picture.image);



    axios.post(`api/category-edit/${props.data.id}`, formData).then((res) => {
      if (res.data.status === 200) {
        setModal(true);
        props.closeModalFunction();
        toast.success(res.data.message);
      } else {
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
          Category Name
        </label>
        <input
          type="text"
          id="Name"
          name="name"
        
          value={inputData.name}
          onChange={inputHandler}
          className="form-control"
          dir="rtl"
        />
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.name : ""}
        </p>
      </div>
        
      <div className="d-flex mt-2 ">
        <label className="pe-3">Status :</label>
        {status ==1 ?(
           <div className="mx-4">
         
           <input
             className="form-check-input me-3"
             type="radio"
             value={"1"}
             onChange={radioHandler}
             id="flexRadioDefault1"
             name="status"
             defaultChecked
          
             
           />
           <label className="form-check-label" htmlFor="flexRadioDefault1">
             Visible
           </label>
         </div>
        ) :(<div className="mx-4">
         
        <input
          className="form-check-input me-3"
          type="radio"
          value={"1"}
          onChange={radioHandler}
          id="flexRadioDefault1"
          name="status"
          
       
          
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Visible
        </label>
      </div>)}
      {status ==0?(<div className="mx-4">
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
            Hidden
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
            Hidden
          </label>
        </div>)}
        
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          Description
        </label>
        {/* <textarea
          id="form3Example3"
          className="form-control"
          name="description"
          value={inputData.description}
          onChange={inputHandler}
          dir="rtl"
        >
          {props.data.description}
        </textarea>
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.description : ""}
        </p> */}
        <CKEditor
        editor={ClassicEditor}
        data={inputData.description}
        config={{
          removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
      }}
        onInit={editor=>{

        }}
        onChange={handelCkeditor}
       
        />
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
          <img className="w-50" src={`/uploads/share/Category/${props.data.image}`}/>
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
