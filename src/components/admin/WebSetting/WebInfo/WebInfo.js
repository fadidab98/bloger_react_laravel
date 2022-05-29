import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import './WebInfo.css'


function WebInfo() {

    const [loading,setLoading]=useState(true);
    const [refresh,setRefresh]=useState(1);
   
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [email,setEmail]=useState('');
    const [location,setLocation]=useState('');
    const [description,setDescription]=useState('');
    const [header,setHeader]=useState('');
    const [facebook,setFacebook]=useState('');
    const [instagram,setInstagram]=useState('');
 const freshHandler =()=>{
     setRefresh(...refresh+1);
 }
 
    useEffect(()=>{
        axios.get('api/setting').then(res=>{
            if(res.data.status==200)
            {
                setName(res.data.setting.web_name);
                setEmail(res.data.setting.web_email);
                setLocation(res.data.setting.web_location);
                setHeader(res.data.setting.web_header)
                setNumber(res.data.setting.web_number);
                setLocation(res.data.setting.web_location);
                setDescription(res.data.setting.web_description);
                setFacebook(res.data.setting.web_facebook);
                setInstagram(res.data.setting.web_instagram);
            
            }
        })
    },[refresh]);
   

  
   const submithandler=(e)=>{
       e.preventDefault();
       const sentdata={
           web_name:name,
           web_number :number,
           web_email:email,
           web_location:location,
           web_description:description,
           web_header:header,
           web_facebook:facebook,
           web_instagram:instagram,

       }
       console.log(sentdata)
       axios.post('api/update-setting',sentdata).then(res=>{
           if(res.data.status == 200)
           {
            toast.success(res.data.message);
            freshHandler();
           }
       })
   }
   const inputhandlerName=(e)=>{
    e.persist();
       setName(e.target.value)
   }
   const inputhandlerNumber=(e)=>{
    e.persist();
       setNumber(e.target.value)
   }
   const inputhandlerLocation=(e)=>{
    e.persist();
       setLocation(e.target.value)
   }
  const onChangeFacebook=(e)=>{
    e.persist();
    setFacebook(e.target.value)
  }
   const handelCkeditorEmail =(event,editor)=>{
    const dataEditor = editor.getData();
    setEmail (dataEditor)

  }
  const handelCkeditorHeader =(event,editor)=>{
    const dataEditor = editor.getData();
    setHeader (dataEditor)

  }
  const handelCkeditorDescription =(event,editor)=>{
    const dataEditor = editor.getData();
    setDescription (dataEditor)
 
  }
  const handelCkeditorFacebook =(event,editor)=>{
    const dataEditor = editor.getData();
    setFacebook (dataEditor)
    
  }
  const onChangeInstagram =(e)=>{
   e.persist();
   setInstagram(e.target.value)
  }
  return (
    <><h2 className='text-center'>Website Information</h2>
    <form onSubmit={submithandler}>
      <div id="table_user">
      <table className='table  m-auto mt-5' >
    
    <tbody>
    <tr>
    <td>Website Name</td>
    <td><input type="text" name="name" onChange={inputhandlerName} className="form-control" value={name} dir="rtl"/></td>
    </tr>
      <tr>
    <td>Website Email</td>
    <td>
    <CKEditor
          editor={ClassicEditor}
          data={email}
          language="ar"
          config={{
            removePlugins: ["EasyImage","ImageUpload","MediaEmbed"],
            
        }}
          onInit={editor=>{

          }}
          onChange={handelCkeditorEmail}
        
          />
    </td>
    </tr> 
    
    <tr>
    <td>Website Location</td>
    <td><input type="text" name="location" onChange={inputhandlerLocation} className="form-control" value={location} dir="rtl" /></td>
    </tr>
    <tr>
    <td>Website Number</td>
    <td><input type="text" name="number" onChange={inputhandlerNumber} className="form-control" value={number} dir="rtl" /></td>
    </tr>
    <tr>
    <td>Website Header</td>
    <td>


    <CKEditor
          editor={ClassicEditor}
          data={header}
          config={{
            removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
        }}
          onInit={editor=>{

          }}
          onChange={handelCkeditorHeader}
        
          />
    </td>
    </tr>

    <tr>
    
      <td>Website Facebook</td>
      <td>
        <input type='text' className="form-control"  onChange={onChangeFacebook} value={facebook} />
   
      </td>
      </tr>
      <tr>
      <td>Website Instagram</td>
      <td>
      <input type='text' className="form-control"  onChange={onChangeInstagram} value={instagram} />
      </td>
      </tr>
      <tr>
    <td>Website Description</td>
    <td>
    <CKEditor
          editor={ClassicEditor}
          data={description}
          config={{
            removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
        }}
          onInit={editor=>{

          }}
          onChange={handelCkeditorDescription}
        
          />

    </td>
    </tr> 
    

    </tbody>
  
      </table>
</div>
     <div className='text-center mt-5'><button type="submit" className="btn btn-primary">
          Save
        </button></div>
    </form>
    
    
    </>
  )
}

export default WebInfo