import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import $ from "jquery";
import { Route } from "react-router-dom";
import axios from "axios";
import SmLoading from "../../admin/SmLoading/SmLoading";
import Category from "../../../components/front-end/Categories/Category";
import { useParams ,useLocation  } from "react-router-dom";
const Navbar = () => {
  const { category } = useParams();
  const [show,setShow]=useState(false);
  const [showsearchs,setSearch]=useState(false);
  const [data,setData]=useState({});
    const history = useHistory();
  const [suggestion,setSuggestion]=useState({});
  const [nav, setNav] = useState([]);
 const [searchs , setSearchs]=useState('');
  useEffect(() => {
    axios.get("/api/Navbar").then((res) => {
      if (res.data.status == 200) {
        setNav(res.data.data);
      
      }
    });
    axios.get('/api/search').then(res=>{
      if(res.data.status ==200){
        setData(res.data.data)
      }
    })
  },[]);
  const onChangeHandler=(texts)=>{
    if(searchs.length>0){
      return texts.filter(text=> text.name.toLowerCase().indexOf(searchs)>-1) ||texts.filter(text=> text.categoryName.toLowerCase().indexOf(searchs)>-1) 
    }
    
  }
  function opensearchpage(){
    if(showsearchs)
    {
      setSearch(false)
    }
    else{
      setSearch(true)
    }
  }
  var x=0
  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 500);
    console.log('page to reload')
}
  const  showsearch=()=> {
   if(show)
   {
    setShow(false)
   }
   else{
    setShow(true)
   }
  }
  
  let url = window.location.pathname;
  console.log(category);
  return  ( 
    <>
    <nav className="front-nav" dir="rtl">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn" >
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">
        <img src="/uploads/Massaha/Massaha.png" />
        
      </label>
      <ul className="front-nav-item cairo">
      <li id="form-groub-search"><div className="form-groub">

          <label htmlFor="search">
          <i className="fas fa-search text-white " onClick={opensearchpage}></i>
          </label>
          </div>
          <div id="search_conatainer-sm">
     <div>
     <input type="text"   className="form-control" placeholder="أبحث هنا" onChange={e=> setSearchs(e.target.value)}
     value={searchs}
     />
     <div className="search_result-sm">
       <ul>
  
         {searchs? (onChangeHandler(data).length>0?(
           onChangeHandler(data).map(da=>{
            return  <li key={da.id}><Link  to={`/${da.categoryName}/${da.id}`} >{da.name}</Link></li>
          })
         ):(<li><a >لا يوجد بيانات</a></li>)):''}
        


         </ul></div></div>
     </div>
          </li>
        <li className={url == "/" ? "active" : ""}>
          <NavLink to="/">الرئيسية</NavLink>
        </li>
        <li className={url == "/About" ? "active" : ""}>
          <NavLink to="/About">من نحن</NavLink>
        </li>
        <li className={url == "/adsadsads" ? "active dropp-linkes" : "dropp-linkes"}>
          <a style={{cursor:'pointer'}} >مواضيعنا <i className="fas fa-angle-down"></i></a>
          <ul className="dropp-linkes-links">
            {nav.map((na) => {
          return (
            <li key={na.id}>
              <NavLink  className="dropp-linkes-links-a"
                to={`/${na.name}`}
                
              >
                {na.name}
              </NavLink>
            </li>
          );
        })}
          </ul>
        </li>
       
        
      </ul>
    </nav>
    {showsearchs ?(  <div id="search_page">

    <span><a className="btn" onClick={opensearchpage}>&times;</a></span>
   <div id="search_conatainer">
     <div>
     <input type="text"   className="form-control" placeholder="أبحث هنا" onChange={e=> setSearchs(e.target.value)}
     value={searchs}
     />
     <div className="search_result">
       <ul>
  
       {searchs? (onChangeHandler(data).length>0?(
           onChangeHandler(data).map(da=>{
            return  <li key={da.id}><Link onClick={refreshPage}  to={`/${da.categoryName}/${da.id}`} >{da.name}</Link></li>
          })
         ):(<li className="text-center">لا يوجد بيانات</li>)):''}
        


         </ul></div>
     </div>
   </div>
       


    </div>):''}
    </>
  )
};
export default Navbar;
