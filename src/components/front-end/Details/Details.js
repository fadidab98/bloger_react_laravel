import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SmLoading from "../../../Layout/admin/SmLoading/SmLoading";
import axios from "axios";
import "./Details.css";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import copy from "copy-to-clipboard";  
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import parse from 'html-react-parser'
import {Helmet} from "react-helmet";
import {

  FacebookShareButton,
  
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,

} from "react-share";
export default function Details() {
  // api/viewPost/
  const { id, category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyText, setCopyText] = useState('http://www.massaha.info' + window.location.pathname + window.location.search);
  useEffect(() => {
    axios.get(`api/viewPost/${id}`).then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        setLoading(false);
      
      }
    });
  }, []);
  if (loading) {
    return <SmLoading />;
  }
 

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  function getTimes(){
    var datetime=  new Date( data[0].created_at ).getTime();
    
    var today = new Date();
    var dates = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+(today.getHours()-4) + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(parseInt(datetime)) 
    var now = new Date(parseInt(dates)).getTime();
 
      var milisec_diff = parseInt(now) - parseInt(datetime);
  

  var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

  var date_diff = new Date( milisec_diff );
  if( days<= 1){
    console.log(date_diff)
    return   date_diff.getHours() + ":" + date_diff.getMinutes() + ":" + date_diff.getSeconds() ;
    
  }
  else{
    return  days +"d "+ date_diff.getHours() + ":" + date_diff.getMinutes() + ":" + date_diff.getSeconds() ;
  }
 
 
  }
  const copyToClipboard = () => {
    // copy(copyText);
    alert(`Copied `);
 }
  document.title= data[0].name
  document.querySelector('meta[name="title"]').setAttribute("content", data[0].name);
 
  document.querySelector('meta[name="description"]').setAttribute("content", data[0].name);
  document.querySelector('meta[property="og:image"]').setAttribute("content", `https://www.massaha.info/uploads/share/Posts/${data[0].images}`);
  document.querySelector('meta[name="url"]').setAttribute("content", window.location.href);
 
  document.querySelector('meta[name="type"]').setAttribute("content", 'مقالات مساحة');
  return (
    <section>
     
     <Helmet>
                <meta property="fb:page_id" content="392284762708316" />
        
        <meta name='description' content={data[0].name}/>
        <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={data[0].name}/>
            <meta property="og:type"  content="مقالات" />
          
            <meta property="og:description" content={data[0].name}/>         
            
            <meta property="og:image" content={`https://www.massaha.info/uploads/share/Posts/${data[0].images}`}/>
            
    

  
      </Helmet> 
    <div className="container-fluid main_containt bg-light">
    
      <div className="container bg-white">
        <div className="row">
          <div className="col-md-8">
            <h2 className="roboto">{data[0].name}</h2>
            <span className="text-secondary">
              <h6>
              
                {data[0].viewed} <i className="fas fa-eye"></i> |
                {getTimes()} <i className="fas fa-clock fa-sm text-secondary mx-1"></i>
              </h6>
            </span>
            <div className="d-flex justify-content-between about-det">
              <div className="auther ropoto">
                <h4 className="auther-name">
                  <i className="fas fa-pen fa-xs px-1 "></i>
                  {data[0].userName}
                </h4>
              </div>
              <div className="social-share ">
              <span
               
                  className=" mx-1 p-2 text-white bg-secondary  rounded-pill"
                  title="share to Facebook"
                >
              <FacebookShareButton  url={window.location.href} appId={392284762708316} >
                  <i className="fab fa-facebook fa-lg px-1 "></i>
             </FacebookShareButton>
             </span>
                <span
                  
                  className=" mx-1 p-2 text-white bg-secondary  rounded-pill"
                  title="share to Instagram"
                >
                  <TwitterShareButton  url={window.location.href} >
                  <i className="fab fa-twitter fa-lg px-1 "></i>
             </TwitterShareButton>
                </span>
                <a onClick={copyToClipboard} className=" mx-1 p-2 text-white bg-secondary" title="Copy Url">
                    <i className="fas fa-copy fa-lg px-1"></i>
                  </a>
              </div>
            </div>
            <div className="w-100">
              <img
                id="post-details-image"
                src={`/uploads/share/Posts/${data[0].images}`}
                alt="No Image"
              />
              <h5 className="cairo pt-2" style={{lineHeight:'2.1rem'}}>{parse( data[0].description)}</h5>
            </div>
          </div>
          <div className="col-md-4 pt-1">
            <div className="card-header  card-header-newData cairo">
              <span className="header-mark mx-2"></span>
              <h4 className="">استوديو الصور </h4>
            </div>
            <div className="w-100 ">
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
                        className="w-50 p-1"
                        alt="No Image"
                      />
                    </a>
                  );
                })}
              </LightGallery>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section> );
}
