import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import "./AddForm.css";
import axios from "axios";
import Cookies from "js-cookie";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
toast.configure();
function AddForm(props) {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState({
    data:[]
  });
  const history = useHistory();
    const id = Cookies.get("id");
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    category_id: "",
    user_id: id ,
     main_images: [] ,
    error_message: [],
  });
  const [status, setStatus] = useState("1");
  const [picture, setPecture] = useState({ image: "" });
  
  const inputHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const radioHandler = (e) => {
    setStatus(e.target.value);
  };
  const handelCkeditor =(event,editor)=>{
    const dataEditor = editor.getData();
    setInputData({...inputData, description: dataEditor})
    // console.log(dataEditor);
  }
  const inputImage = (e) => {
    setPecture({ image: e.target.files[0] });
  };
   const inputManyImage = (e) => {
    setInputData({ ...inputData, main_images: [...inputData.main_images,...e.target.files] });
  };
   useEffect(() => {
    axios.get("/api/moderator/Categories").then((res) => {
      if (res.data.status == 200) {
        setCategory({ ...category, data: res.data.data });
        
      }
      if (res.data.status == 204) {
        setCategory({ message: res.data.message});

        
      }
    });
  }, []);
  console.log(category)
  const submitForm = (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("description", inputData.description);
    formData.append("status", status);
    formData.append("userId", inputData.user_id);
    formData.append("category_id", inputData.category_id);
    formData.append("image", picture.image);

    inputData.main_images.forEach((image_file) => {         formData.append('many_image[]', image_file);     });


    axios.post("api/add-post", formData).then((res) => {
      if (res.data.status === 200) {
        setModal(true);
        props.closeModalFunction();
        toast.success("Success");
      } else {
        setInputData({ ...inputData, error_message: res.data.message_error });
        toast.error("Error");
        console.log(inputData.error_message);
      }
    });
   
  };

  return (
    <form onSubmit={submitForm} encType="multipart/form-data">
      <div className="form-outline">
        <label className="form-label" htmlFor="Name">
          Post Name
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
         <div className="form-outline">
         <label className="pe-3">Category :</label>
        <select name="category_id" onChange={inputHandler} vlaue={inputData.category_id} className="form-select form-select-sm" aria-label=".form-select-sm example">
          <option selected>Select Category</option>
          {category.data.length > 0 ?(category.data.map(da=>{
            return  <option key={da.id} value={da.id}>{da.name}</option>
          })):(<option >No Category Added</option>)}
         
         
        </select>
          </div>
      <div className="d-flex mt-2 ">
        <label className="pe-3">Status :</label>
        <div className="mx-4">
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
            Visible
          </label>
        </div>
        <div className="mx-4">
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
        </div>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          Description
        </label>
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
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.description : ""}
        </p>
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
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example4">
          More Images
        </label>
        <input
          type="file"
          name="many_image[]"
          multiple
          
          onChange={inputManyImage}
          id="form3Example4"
          dir="rtl"
          className="form-control"
        />
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.main_image : ""}
        </p>
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

export default AddForm;
