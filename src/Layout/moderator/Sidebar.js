import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'


export default function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand  p-0"
        to=""
      >
       <img id="main-icon" src="/uploads/Massaha/Massaha.png"  />
       
    
        {/* <div className="sidebar-brand-text mx-3">
          SB Admin <sup>2</sup>
        </div>       <Link
        className="sidebar-brand p-0 "
        to="index.html"
        style={{height: "5.375rem"}}
      >
        
         
    
        {/* <div className="sidebar-brand-text mx-3">
          SB Admin <sup>2</sup>
        </div> */}
 
      
      </Link>

      <hr className="sidebar-divider my-2" />

      <li className="nav-item active">
        <Link className="nav-link" to="/moderator/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Interface</div>


     
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#Posts"
          aria-expanded="true"
          aria-controls="Posts"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Posts</span>
        </Link>
        <div
          id="Posts"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Manage Posts</h6>
            <Link className="collapse-item" to="/moderator/Posts">
              Posts
            </Link>
          </div>
        </div>
      </li>
   

      

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
{/* 
      <div className="sidebar-card d-none d-lg-flex">
      
       
      </div> */}
    </ul>
  );
}
