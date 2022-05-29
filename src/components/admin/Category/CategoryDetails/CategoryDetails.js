import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useHestory,useParams} from 'react-router-dom'
import SmLoading from '../../../../Layout/admin/SmLoading/SmLoading';
import  './CategoryDetails.css'
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import parse from 'html-react-parser'
import AddForm from './AddForm'
import Edit from './Edit'
function CategoryDetails() {
    const {id} = useParams();
    const [data,setData]=useState({});
    const [openEitModal, setEditOpenModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        axios.get(`api/category-show/${id}`).then(res=>{
            if(res.data.status ==200){
                setData(res.data.data);
                setLoading(false);
            }
        })
    },[openEitModal])
    const openModalFunction = () => {
        setOpenModal(true);
      };
      const closeModalFunction = () => {
        setOpenModal(false);
      };
      const openEditModalFunction = () => {
        setEditOpenModal(true);
      };
      const closeEitModalFunction = () => {
        setEditOpenModal(false);
      };
      const onInit = () => {
        console.log("lightGallery has been initialized");
      };
if(loading)
{
    return <SmLoading/>
}
  return (
    <div className="card">
         <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div aria-label="breadcrumb bg-light">
            <ol className="breadcrumb p-0 m-0 bg-light ">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </div>
          <a
            title="Edit"
            type="button"
            onClick={openModalFunction}
            className="btn btn-primary btn-icon-split p-0 rounded-pill"
          >
            <span className="icon text-white-100 m-0">
              <i className="fas fa-plus"></i>
            </span>
          </a>
        </div>
      </div>
      <div className="card-body" dir="rtl">
        <div className="container bg-white">
    <div id="Category" dir='rtl'>
        <div className='card'>
            <div className='card-header'>
            <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                >
                     <a  href={`/uploads/share/Category/${data.image}`}>
                    <img src={`/uploads/share/Category/${data.image}`}/>
                    </a>
                </LightGallery>
                
            </div>
            <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">{parse(data.description)}</p>
             </div>
             <ul className="list-group list-group-flush">
                <li className="list-group-item">{data.status == 1?(<span className="badge badge-primary">Show</span>):(<span className="badge badge-danger">Hidden</span>)}</li>
                <li className="list-group-item"><div className='d-flex justify-content-center'><button  className='btn btn-danger w-25 mx-5'><i className='fas fa-trash'></i></button> <button onClick={openEditModalFunction} className='btn btn-primary w-25 mx-5'><i className='fas fa-pen '></i></button></div></li>
            </ul>
            </div>
            
    </div> </div>
    </div> 
     {/* Modal */}
     {openModal ? (
        <div className="Modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Post
              </h5>

              <button
                type="button"
                className="close"
                onClick={closeModalFunction}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* form */}
              <AddForm
                closeModalFunction={closeModalFunction}
                
                // closeChildmoadl={closeChildmoadl}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {
        openEitModal ?
        (
          <div className="Modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Post
                </h5>
  
                <button
                  type="button"
                  className="close"
                  onClick={closeEitModalFunction}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* form */}
                <Edit
                data={data}
                closeModalFunction={closeEitModalFunction}
                  // closeChildmoadl={closeChildmoadl}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      }</div>
  )
}

export default CategoryDetails