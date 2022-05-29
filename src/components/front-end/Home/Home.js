import React, { useState, useEffect } from "react";
import Header from "./Header";
import Loading from "../../../Layout/admin/SmLoading/SmLoading";
import Newdata from "./Newdata";
import axios from "axios";

import "./Home.css";
import { Link } from "react-router-dom";
import parse from 'html-react-parser'

export default function Home() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/home-data").then((res) => {
      if (res.data.status == 200) {
     
        setData(res.data);
        setPosts(res.data.postCategory);
        setLoading(false);
        
      }
    });
  }, []);
 
 
  if (loading) {
    return <Loading />;
  }

  var maxId = 0;

  function getTimes(data){
    var datetime=  new Date(data ).getTime();
    var today = new Date();
    var dates = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+(today.getHours()-4) + ":" + today.getMinutes() + ":" + today.getSeconds();
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
  return (
    <section>
  
      <Header />

      <div className="container-fluid p-0 m-0">
        <div className="row p-0 m-0">
          <div className="col-lg-9 col-md-8 col-sm-12  m-0 p-0">
            <div className="card h-100 p-0 m-0 border-0">
              <div className="card-header  card-header-newData cairo ">
                <span className="header-mark mx-2"></span>
                <h4 className="">أحدث الأخبار</h4>
              </div>
              <div className="card-body p-0 m-1 ">
                <Newdata data={data.newData} className="m-0 p-0" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 pl-0 pr-0">
            <div className="card m-0 border-0">
              <div className="card-header  card-header-newData cairo">
                <span className="header-mark mx-2"></span>
                <h4 className="">الأكثر قراءة</h4>
              </div>
              <div className="card-body ">
                {data.newposts.map((da) => {
                  return (
                    <Link key={da.id} to={`/${da.categoryName}/${da.id}`}>
                      <div className="card_data container" >
                        <div className="card_data_image">
                          <img src={`/uploads/share/Posts/${da.images}`} alt="No Image" />
                        </div>
                        <div className="card_data_text roboto">
                          <h5>{da.name.substr(0, 70) + "..."}</h5>
                        </div>
                        <span  > <i className="fas fa-eye"></i> {da.viewed}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row">
            {" "}
            {Object.entries(posts).map(([key, value]) => (
              <div  className="col-md-12 p-0">
                {value.forEach((v) => {
                  maxId = Math.max(v.id);
                 
                })}

                <div key={key} className="card m-0 p-0 border-0">
                  <div className="card-header  card-header-newData cairo">
                    <span className="header-mark mx-2"></span>
                  <h4 className=""> {key } <Link className="float-left" to={`/${key}`} id="more_link">للمزيد <i className="fas fa-angle-left px-1"></i></Link> </h4> 
                   
                    
                  </div>
                  
                  <div className="card-body px-0">
                    <div className="container px-3">
                      {value.map((val) => {
                        return maxId == val.id ? (
                          <div key={val.id} className="row">
                            <div className="col-md-6 col-post-image-big ">
                            
                              <div className="big_data">
                              <Link to={`/${val.categoryName}/${val.id}`}>
                              <img src={`uploads/share/Posts/${val.images}`} alt="No Image" />
                              <span  > <i className="fas fa-eye"></i> {val.viewed}</span>
                              </Link>
                              </div>
                            
                            </div>
                            
                            <div className="col-md-6 col-post-details pt-5">
                              {}
                              <h4 className="wrap cairo col-post-details-name">
                                {val.name}
                              </h4>
                              <h5 className="wrap roboto ">
                                إعداد
                                <span className="text-secondary" dir="rtl">
                                  {" "}
                                 {val.userName}  
                                </span>{" "}
                              </h5>
                              <h6 className="wrap cairo">{parse( val.description.substr(0,200))}</h6>
                              <div>{getTimes(val.created_at)} <i className="fas fa-clock"></i> </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                       <div className="row mt-3">
                      {value.map((val) => {
                        return maxId != val.id ? (
                          
                            <div key={val.id} className="col-md-4">
                              <Link to={`/${val.categoryName}/${val.id}`}>
                              <div className="col-md-small ">
                 
                                <img
                                  src={`uploads/share/Posts/${val.images}`}
                                  alt="No Image"
                                />
                                <span  > <i className="fas fa-eye"></i> {val.viewed}</span>
                                <div className="col-md-small-text">
                                  <h5 className=" wrap cairo">
                                    {val.name.substr(0, 175) + "..."}
                                  </h5>
                                </div>
                               
                              </div>
                              </Link>
                            </div>
                           
                        
                        ) : (
                          ""
                        );
                      })}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
