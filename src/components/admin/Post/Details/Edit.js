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
    category_id: props.data.category_id,
    user_id: id ,
     main_images:[] ,
    error_message: [],
  });
  const [status, setStatus] = useState(props.data.status);
  const [picture, setPecture] = useState({ image: props.data.images });
  
  const inputHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const radioHandler = (e) => {
    setStatus(e.target.value);
  };
 
  const inputImage = (e) => {
    setPecture({ image: e.target.files[0] });
  };
  const setsel=(id)=>{
   if(props.data.category_id === id )
   {return 'selected'}
   else{
     return '';
   }
  }
   const inputManyImage = (e) => {
    setInputData({ ...inputData, main_images: [...inputData.main_images,...e.target.files] });
  };
  const handelCkeditor =(event,editor)=>{
    const dataEditor = editor.getData();
    setInputData({...inputData, description: dataEditor})
    // console.log(dataEditor);
  }
   useEffect(() => {
   
    axios.get(`/api/Categories/${id}`).then((res) => {
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


    axios.post(`api/edit-post/${props.data.id}`, formData).then((res) => {
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
             var selected1 = (props.data.category_id === da.id ) ? 'selected' : 'false';
            return   (
              
            
            <option   key={da.id} value={da.id} selected={selected1} >{da.name}</option>)
          })):(<option >No Category Added</option>)}
         
         
        </select>
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
        <div className="d-flex justify-content-center" >
          <img className="w-50" src={`/uploads/share/Posts/${props.data.images}`}/>
        </div>
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
        {props.data.main_images.split(",").map((image) => {
                    return (
                   
                        <img
                        key={image}
                          src={`/uploads/share/Posts/${image}`}
                          className="w-50 p-1"
                        />
                   
                    );
                  })}
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
