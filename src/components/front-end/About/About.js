import axios from 'axios';
import React, { useEffect, useState } from 'react'

import "react-toastify/dist/ReactToastify.css";

import parse from 'html-react-parser'
import './About.css'
import SmLoading from '../../../Layout/admin/SmLoading/SmLoading';
function About() {
    const [refresh,setRefresh]=useState(1);
     const[loading,setLoading]=useState(true);
    const [about,setAbout]=useState('');
    const [data,setData]=useState([]);
   
     
  var index =0; 
    useEffect(()=>{
        axios.get('/api/category-front').then(res=>{
            if(res.data.status==200)
            {
                setData(res.data.data);
                setLoading(false)

            }
        });
        axios.get('api/setting').then(res=>{
            if(res.data.status==200)
            {
                setAbout(res.data.setting.web_about);
                setLoading(false)
            }
        })
    },[refresh]);
   
     
      
        if(loading){
            return <SmLoading/>
        }
    
     
  return (
    <section className='mt-5 pt-5'>
    
    
    <div className='container-fluid my-5 ' dir='rtl'>
        <div className='container text-center'>{parse(about)}</div>
        <div className='container '>
        {
           data.map(da=>{ 
               
            index++
              
               if(index%2 == 0) {
                   return <div className='row' key={da.id} dir="rtl">
                   <div className='col-md-6'><div className='category_image'><img src={`/uploads/share/Category/${da.image}`} alt="No Image" /><h5>{da.name}</h5></div></div>
                   <div className='col-md-6'><div className='category_desc-right'><h6 className='cairo' dir="rtl">{parse(da.description)}</h6></div></div>
               </div>
               }else{
                return <div className='row' key={da.id} dir="ltr">
                <div className='col-md-6'><div className='category_image'><img src={`/uploads/share/Category/${da.image}`} alt="No Image"/><h5>{da.name}</h5></div></div>
                <div className='col-md-6'><div className='category_desc-left'><h6 className='cairo' dir="rtl">{parse(da.description)}</h6></div></div>
            </div>   
               }}
           )
        }
           </div>
    </div>
    </section>
  )
}

export default About