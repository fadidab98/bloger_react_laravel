import React, { useState } from "react";
import LightGallery from "lightgallery/react";
import { Link } from "react-router-dom";
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
import parse from 'html-react-parser'
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory,{textFilter} from "react-bootstrap-table2-filter";
export default function Table({ datas,changeState }) {

 
    function describeFunction(cell,row)
    {
      return <div>{parse(cell.substr(0,10)) }</div>
    }
    const deleteData=(e,id)=>{
      e.preventDefault();
      changeState(id);
        axios.get(`/api/moderator/delete-post/${id}`).then(res=>{
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
                      to={`/moderator/${row.categoryName}/${row.id}`}
                      className="btn btn-primary rounded-circle btn-sm mx-1"
                    >
                      <i className="fas fa-eye"></i>
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
                              <a href={`/uploads/share/Posts/${cell}`}>
                                <img
                                  src={`/uploads/share/Posts/${cell}`}
                                  style={{ width: "4rem" }}
                                />
                              </a>
                            </LightGallery>
          );
        
       
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
        filter:textFilter(),
        
      },{
        dataField:'images',
        text: 'Image',
        formatter:imageFormatter,
        headerStyle: {
          lineHeight:"60px"
         }
      },
      {
        dataField:'description',
        text: 'Description',
        formatter:describeFunction,
        headerStyle: {
          lineHeight:"60px"
         }
        
      },
      {
        dataField:'categoryName',
        text: 'Category',
        filter:textFilter()
      },
      {
        dataField:'status',
        text: 'Status',
        headerStyle: {
          lineHeight:"60px"
         }
       
      },
      {
        dataField:'userName',
        text: 'Puplisher',
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
       data={datas.data}
        columns={columns} 
        striped 
        hover
        pagination={paginationFactory()}
        filter={filterFactory()}
        /></div>
    }
