import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import parse from 'html-react-parser'
import './AboutUs.css'
import Cookies from 'js-cookie';
function AboutUs() {
    const [refresh,setRefresh]=useState(1);
   const id = Cookies.get("id");
    const [about,setAbout]=useState('');
    const [data,setData]=useState([]);
    const [directions,setDirections]=useState('left');
    const freshHandler =()=>{
        setRefresh(...refresh+1);
    }
     
  var index =0; 
    useEffect(()=>{
        axios.get(`api/Categories/${id}`).then(res=>{
            if(res.data.status==200)
            {
                setData(res.data.data);

            }
        });
        axios.get('api/setting').then(res=>{
            if(res.data.status==200)
            {
                setAbout(res.data.setting.web_about);

            }
        })
    },[refresh]);
    const submithandler=(e)=>{
        e.preventDefault();
        const sentdata={
            web_about:about,
            
 
        }
        console.log(sentdata);
        axios.post('api/update-setting',sentdata).then(res=>{
            if(res.data.status == 200)
            {
             toast.success('success');
             freshHandler();
            }
        })
    }
       const handelCkeditorAbout =(event,editor)=>{
        const dataEditor = editor.getData();
        setAbout (dataEditor)
        // console.log(dataEditor);
      }
      const changedir=(da)=>{
          for(var i =0;i<data.length;i++)
          {
            if(da== 'left')
            {
                 setDirections('right')
            }
            else if(da =='right'){
                setDirections('left')
            }
          }
      
        
      }
      console.log(directions)
  return (
    <div> <h2 className="text-center">AboutUs</h2>
    
    <form className='m-auto' style={{width:'75%'}} onSubmit={submithandler}>
        <div className='form-group'>
        <lable>About Massaha</lable>
        <CKEditor
        editor={ClassicEditor}
        data={about}
        
        config={{
          removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
      }}
        onInit={editor=>{

        }}
        onChange={handelCkeditorAbout}
       
        />
        </div>
        <div className='text-center'>
            <button className='btn btn-primary'>Save</button>
        </div>
    </form>
    <div className='container p-5' dir='rtl'>
        {parse(about)}
        <div className='container'>
        {
           data.map(da=>{ 
               
            index++
              
               if(index%2 == 0) {
                   return <div className='row' key={da.id} dir="rtl">
                   <div className='col-md-6'><div className='category_image'><img src={`/uploads/share/Category/${da.image}`}/><h5>{da.name}</h5></div></div>
                   <div className='col-md-6'><div className='category_desc-right'><h6 className='cairo' dir="rtl">{parse(da.description)}</h6></div></div>
               </div>
               }else{
                return <div className='row' key={da.id} dir="ltr">
                <div className='col-md-6'><div className='category_image'><img src={`/uploads/share/Category/${da.image}`}/><h5>{da.name}</h5></div></div>
                <div className='col-md-6'><div className='category_desc-left'><h6 className='cairo' dir="rtl">{parse(da.description)}</h6></div></div>
            </div>   
               }}
           )
        }
           </div>
    </div>
    </div>
  )
}

export default AboutUs