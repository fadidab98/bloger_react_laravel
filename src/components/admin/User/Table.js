import React, { useState } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import axios from 'axios'
import "./Table.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory,{textFilter} from "react-bootstrap-table2-filter";
import { Link } from "react-router-dom";
export default function Table({ data,changeState }) {

  const deleteData=(e,id)=>{
    e.preventDefault();
    changeState(id);
      axios.get(`/api/delete-user/${id}`).then(res=>{
            if(res.data.status ==200)
            {
              toast.success(res.data.message);
            }
            else{
          toast.error("Error");
            }
      })
    }
    const onInit = () => {
        console.log("lightGallery has been initialized");
      };
      function controllFunction(cell,row)
      {
        return (<div className="d-flex justify-content-center align-items-center h-100">
                         <button
                            
                            className="btn btn-danger rounded-circle btn-sm mx-1"
                            onClick={e=>deleteData(e,row.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <Link
                            to={`/admin/Users/${row.id}`}
                            className="btn btn-primary rounded-circle btn-sm mx-1"
                          >
                            <i className="fas fa-pen"></i>
                          </Link>
                        </div>);
      }
    function imageFormatter(cell, row){
      
        return (
          <LightGallery
                            onInit={onInit}
                            speed={500}
                            plugins={[lgThumbnail, lgZoom]}
                          >
                            <a href={`/uploads/admin/user-image/${cell}`}>
                              <img
                                src={`/uploads/admin/user-image/${cell}`}
                                style={{ width: "4rem" }}
                              />
                            </a>
                          </LightGallery>
        );
      
    
    }
    function statusFormatter (cell,row){
      return(cell == 1?(<span className="badge badge-primary">Unblocked</span>):(<span className="badge badge-danger">Blocked</span>));
    }
    function roleFormatter (cell,row){
      return(cell == 1?(<span className="badge badge-primary">admin</span>):(<span className="badge badge-danger">Moderator</span>));
    } 
    const columns =[{
      dataField:"id",
      text:"Id",
      sort:true,
      headerStyle: {
        lineHeight:"60px"
       }
      
    },{
      dataField:"name",
      text:"Name",
      filter:textFilter()
    },{
      dataField:'image',
      text: 'Image',
      formatter:imageFormatter,
      headerStyle: {
        lineHeight:"60px"
       }
    },
    {
      dataField:'email',
      text: 'Email',
      filter:textFilter()
    },
    {
      dataField:'status',
      text: 'Status',
      formatter:statusFormatter,
      headerStyle: {
        lineHeight:"60px"
       }
     
    },
    {
      dataField:'role_as',
      text: 'Role',
      formatter:roleFormatter,
      headerStyle: {
        lineHeight:"60px"
       }
     
    },
    {
     
      text: 'Controll',
      formatter:controllFunction,
      headerStyle: {
        lineHeight:"60px"
       }
    }
  ]
    return <div id="table_user" dir="rtl"><BootstrapTable 
     keyField="id" 
     data={data.data}
      columns={columns} 
     
      striped 
      hover
      pagination={paginationFactory()}
      filter={filterFactory()}
      /></div>
  }

