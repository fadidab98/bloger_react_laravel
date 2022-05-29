import React, { useEffect, useState } from "react";
import "./Footer.css";
import axios from 'axios'
import parse from 'html-react-parser'
import { NavLink } from "react-router-dom";
export default function Footer() {
  const [data,setData]=useState({});
  const [loading,setLoading]=useState(true);
  const [refresh,setRefresh]=useState(1);
 
  const [setting,setSetting]=useState({
      name: '',
      number:'',
      email:'',
      location:'',
      description:''
  })
  const [category,setCategory]=useState([])
const freshHandler =()=>{
   setRefresh(...refresh+1);
}
  useEffect(()=>{
    axios.get("/api/Navbar").then((res) => {
      if (res.data.status == 200) {
        setCategory(res.data.data);
      
      }
    });
      axios.get('api/setting').then(res=>{
          if(res.data.status==200)
          {
             
              setSetting({
                  name: res.data.setting.web_name,
                  number:res.data.setting.web_number,
                  email:res.data.setting.web_email,
                  location:res.data.setting.web_location,
                  description:res.data.setting.web_description
              })
          }

      })
  },[refresh]);
  return (
    <footer className="text-center text-lg-start  text-white">
      <section className="d-flex justify-content-center  p-4 border-bottom text-center">
        <div className="me-5 d-none d-lg-block">
          <span>  تابعونا :</span>
        </div>

        <div>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            
            
            <a href="" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
           
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
           

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">مواضيعنا</h6>
              {category.map((na) => {
          return (
            <p  key={na.id}>
              <NavLink className="text-reset"
                to={`/${na.name}`}
               
              >
                {na.name}
              </NavLink>
              </p>
          );
        })}
              
            </div>

           

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">التواصل</h6>
              <p>
                <i className="fas fa-home me-3"></i> {setting.location}
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>{parse(setting.email)}
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> {setting.number}
              </p>
              
            </div>
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">
                {setting.name}
              </h6>
              <p>
              {parse(setting.description)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05'}} dir="ltr">
    © 2021 Copyright:
    <a href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=fadidab1998@gmail.com&tf=1"> FM.com</a>
  </div>
    </footer>
  );
}
