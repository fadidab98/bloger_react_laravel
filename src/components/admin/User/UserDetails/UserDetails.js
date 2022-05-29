import axios from 'axios';
import React, { useEffect, useState } from 'react'

import {useParams,  useHistory}  from 'react-router-dom'
import SmLoading from '../../../../Layout/admin/SmLoading/SmLoading';
import  './UserDetails.css'
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import AddForm from './AddForm'
import Edit from './Edit'
import { toast } from 'react-toastify';
function UserDetails() {
  const history = useHistory();
    const {id} = useParams();
    const [data,setData]=useState({});
    const [openEitModal, setEditOpenModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        axios.get(`api/show-user/${id}`).then(res=>{
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
const UserPost=(e)=>{
  e.preventDefault();
   axios.get(`/api/delete-user/${id}`).then(res=>{
      if(res.data.status==200)
      {
        history.push('/admin/Users');
        toast.success(res.data.message);
       
      }
      else{
        toast.success(res.data.message);
      }
  })
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
              {data.image ?(         <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                >
                     <a  href={`/uploads/admin/user-image/${data.image}`}>
                    <img src={`/uploads/admin/user-image/${data.image}`}/>
                    </a>
                </LightGallery>):(<div className='d-flex align-items-center justify-content-center' style={{height:'10rem'}}>No Image Added</div>)}
   
                
            </div>
            <div className="card-body">
            
            
             <ul className="list-group list-group-flush text-center">
               <li className="list-group-item">{data.name}</li>
               <li className="list-group-item">{data.email}</li>
                <li className="list-group-item"> {data.status == 1?(<span className="badge badge-primary">Show</span>):(<span className="badge badge-danger">Hidden</span>)}</li>
                <li className="list-group-item">{data.role_as == 1?(<span className="badge badge-primary">admin</span>):(<span className="badge badge-danger">Moderator</span>)}</li>
                <li className="list-group-item"><div className='d-flex justify-content-center'><button onClick={UserPost}  className='btn btn-danger w-25 mx-5'><i className='fas fa-trash'></i></button> <button onClick={openEditModalFunction} className='btn btn-primary w-25 mx-5'><i className='fas fa-pen '></i></button></div></li>
            </ul>
            </div>
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
     
              <AddForm
                closeModalFunction={closeModalFunction}
                
           
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

export default UserDetails