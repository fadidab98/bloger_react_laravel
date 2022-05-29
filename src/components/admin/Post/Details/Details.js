import React, { useState, useEffect } from "react";
import { useParams,Link ,useHistory} from "react-router-dom";
import SmLoading from "../../../../Layout/admin/SmLoading/SmLoading";
import axios from "axios";
import "./Details.css";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import AddForm from "./AddForm";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from './Edit'
import parse from 'html-react-parser'

export default function Details() {
 
  const { id, category } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openEitModal, setEditOpenModal] = useState(false);
 
  useEffect(() => {
    axios.get(`api/viewPost/${id}`).then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        setLoading(false);
      }
    });
  }, [openEitModal]);
  const DeletePost=(e)=>{
    e.preventDefault();
     axios.get(`/api/delete-post/${id}`).then(res=>{
        if(res.data.status==200)
        {
          history.push('/admin/Post');
          toast.success(res.data.message);
         
        }
        else{
          toast.success(res.data.message);
        }
    })
  }
  if (loading) {
    return <SmLoading />;
  }
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
  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('Text copied');
  }
  const shareurl =window.location.href;
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
        <div className="card m-auto" id="card-details">
       
              <div className="card-header p-0" dir="rtl">
                
                <img
                  id="post-details-image"
                  src={`/uploads/share/Posts/${data[0].images}`}
                />
               
              </div>
              <div className="card-body">
              <ul className="list-group list-group-flush border-bottom">
                 
                 <h4 className="cairo pt-2">{data[0].name}</h4>
                 <li className="list-group-item"><div className='d-flex '><span className="px-2">الحالة:</span>{data[0].status == 1?(<span className="badge badge-primary">Show</span>):(<span className="badge badge-danger">Hidden</span>)}</div></li>
            </ul>
                <h5 className="cairo pt-2">{parse(data[0].description)}</h5>
              
                <div className="col-md-12 pt-4">
              <div className="card-header  cairo">
               
                <h4 className="">استوديو الصور </h4>
              </div>
              <div className="w-100 p-0 m-0">
                <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                >
                  {data[0].main_images.split(",").map((image) => {
                    return (
                      <a key={image} href={`/uploads/share/Posts/${image}`}>
                        <img
                          src={`/uploads/share/Posts/${image}`}
                          className="w-50 p-1" id="post-details-image-studio"
                        />
                      </a>
                    );
                  })}
                </LightGallery>
              </div>
        </div>
              </div>
            </div>
            {/*  */}
      
            <div className="card-footer">
            <ul className="list-group list-group-flush">
              
            <li className="list-group-item"><div className='d-flex justify-content-center'><button onClick={ DeletePost}  className='btn btn-danger w-25 mx-5'><i className='fas fa-trash'></i></button> <button onClick={openEditModalFunction} className='btn btn-primary w-25  mx-5'><i className='fas fa-pen '></i></button></div></li>
            </ul>
              </div>
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
                data={data[0]}
                closeModalFunction={closeEitModalFunction}
                  // closeChildmoadl={closeChildmoadl}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      }
    </div>
  );
}
