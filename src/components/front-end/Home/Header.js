import React, { useEffect, useState } from "react";
import './Header.css'
import axios from 'axios'
import parse from 'html-react-parser'
import { Helmet } from "react-helmet";
export default function Header() {
  const [data,setData]=useState({
    header:'',
    facebook:'',
    instagram:''
  })
  console.log('http://www.massaha.info'+window.location.pathnames);
  useEffect(()=>{
    axios.get('api/setting').then(res=>{
      if(res.data.status ==200)
      {
        setData({...data,header:res.data.setting.web_header,instagram:res.data.setting.web_instagram,facebook:res.data.setting.web_facebook})
 
        
      }
    })
  },[])

  return (
    <header>
    {/* <Helmet>




    <title>مساحة</title>

 
    <meta property="fb:page_id" content="392284762708316" />
    <meta property="og:url" content={window.location.href}/>
    <meta property="og:title" content='مساحة'/>
        <meta property="og:type"  content="مقالات" />
       
        <meta name='description' content='مساحة لمجتمع أفضل'/>
    <meta property="og:description" content='مساحة لمجتمع أفضل'/>         
        
    <meta property="og:image" content="http://www.massaha.info/uploads/Massaha/1.png"/>
        
        
       





          

    </Helmet> */}
    <nav className="" id="front-header">
      <img id="front-header-image" src="uploads/Massaha/1.png"  />
      <div id="front-header-text" className="cairo">
       {parse(data.header)}
      </div>
      <div id="social">
        {" "}
        <a href={data.facebook} > <i className="fab fa-facebook  fa-2x"></i></a>
        <a href={data.instagram} > <i className="fab fa-instagram  fa-2x"></i></a>
     
        
      </div>
    </nav>
    </header>
  );
}
