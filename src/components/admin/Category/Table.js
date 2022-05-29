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
import {Link} from 'react-router-dom'
export default function Table({ datas,changeState}) {
  // var x = 0;
  // const styled = `table  text-center  ${
  //   datas.length == 0 ? "" : "table-hover"
  // } `;
  // const onInit = () => {
  //   console.log("lightGallery has been initialized");
  // };
  // const deleteData=(e,id)=>{
  // e.preventDefault();
    
  //   axios.get(`/api/delete-category/${id}`).then(res=>{
  //         if(res.data.status ==200)
  //         {
  //           toast.success(res.data.message);
  //         }
  //         else{
  //       toast.error("Error");
  //         }
  //   })
  // }
 
  // return (
  //   <table className={styled} dir="rtl">
  //     <thead>
  //       <tr>
  //         <th scope="col">#</th>
  //         {cols.map((col, index) => {
  //           return (
  //             <th scope="col" key={index}>
  //               {col}
  //             </th>
  //           );
  //         })}
  //         <th scope="col">status</th>
  //         <th scope="col">action</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {datas == 0 ? (
  //         <tr className="text-center">
  //           <td colSpan="7">
  //             {" "}
  //             <div className="alert alert-danger" role="alert">
  //               No category Added
  //             </div>
  //           </td>
  //         </tr>
  //       ) : (
  //         datas.map((da) => {
  //           return (
  //             <tr key={da.id}>
  //               <td className="many">{x++}</td>
  //               <td className="many">{da.name}</td>

  //               <td className="many">
  //                 <LightGallery
  //                   onInit={onInit}
  //                   speed={500}
  //                   plugins={[lgThumbnail, lgZoom]}
  //                 >
  //                   <a href={`/uploads/share/Category/${da.image}`}>
  //                     <img
  //                       src={`/uploads/share/Category/${da.image}`}
  //                       style={{ width: "4rem" }}
  //                     />
  //                   </a>
  //                 </LightGallery>
  //               </td>
  //               <td className="many">{da.description.substr(0, 6) + "..."}</td>
  //               <td className="many">{da.created_at}</td>
  //               <td className="many">{da.status}</td>
  //               <td className="many">
  //                 <div className="d-flex justify-content-center align-items-center h-100">
  //                   <button
                      
  //                     className="btn btn-danger rounded-circle btn-sm mx-1"
  //                     onClick={e=>deleteData(e,da.id)}
  //                   >
  //                     <i className="fas fa-trash"></i>
  //                   </button>
  //                   <a
  //                     href="#"
  //                     className="btn btn-primary rounded-circle btn-sm mx-1"
  //                   >
  //                     <i className="fas fa-pen"></i>
  //                   </a>
  //                 </div>
  //               </td>
  //             </tr>
  //           );
  //         })
  //       )}
  //     </tbody>
  //   </table>
  // );
    const deleteData=(e,id)=>{
  e.preventDefault();
  changeState(id)
    axios.get(`/api/delete-category/${id}`).then(res=>{
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
                          to={`/admin/Category_show/${row.id}`}
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
                          <a href={`/uploads/share/Category/${cell}`}>
                            <img
                              src={`/uploads/share/Category/${cell}`}
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
   
    text: 'Controll',
    formatter:controllFunction,
    headerStyle: {
      lineHeight:"60px"
     }
  }
]
  return <div id="table_user" dir="rtl"><BootstrapTable 
   keyField="id" 
   data={datas}
    columns={columns} 
    striped 
    hover
    pagination={paginationFactory()}
    filter={filterFactory()}
    /></div>
}
