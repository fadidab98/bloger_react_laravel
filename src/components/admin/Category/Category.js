import React, { useState, useEffect } from "react";

import Table from "./Table";
import axios from "axios";
import AddForm from "./AddForm";
import SmLoading from "../../../Layout/admin/SmLoading/SmLoading";
import "./Category.css";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
export default function Category() {
  const history = useHistory();
  
  const [data, setData] = useState([]);
  const id = Cookies.get("id");
  const [refreshPage,setRreshPage]=useState(1); 
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
 
  const changeState=(data)=>{
    setRreshPage(refreshPage+data);
  }
  const openModalFunction = () => {
    setOpenModal(true);
  };
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    axios.get(`/api/Categories/${id}`).then((res) => {
      if (res.data.status == 200) {
        setData({ ...data, data: res.data.data, cols: res.data.col });
        setLoading(false);
      }
      else if(res.data.status ==400)
        {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_name");
            Cookies.remove("id");
           
            history.push("/login");
            window.location.reload();

        }
     else if (res.data.status == 204) {
        setData({ message: res.data.message, cols: res.data.col });

        setLoading(false);
      }
    });
  }, [refreshPage,openModal]);
 
  
  console.log(refreshPage);
  if (loading) {
    return <SmLoading />;
  }
 
  function searchbar(rows){
    
    return rows.filter(
       (row)=>  row.name.indexOf(search) > -1  );
 
 
   }
   console.log()
  return (
    <div className="card m-0 p-0">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div aria-label="breadcrumb bg-light">
            <ol className="breadcrumb p-0 m-0 bg-light ">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </div>
          <button
            type="button"
            onClick={openModalFunction}
            className="btn btn-primary btn-icon-split p-0 rounded-pill"
          >
            <span className="icon text-white-100 m-0">
              <i className="fas fa-plus"></i>
            </span>
          </button>
       
        </div>
      </div>
      <div className="card-body">
     

        <Table datas={data.data} changeState={changeState} />
      </div>

      {/* Modal */}
      {openModal ? (
        <div className="Modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>

              <button
                type="button"
                className="close"
                onClick={closeModalFunction}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* form */}
              <AddForm
                closeModalFunction={closeModalFunction}
                // closeChildmoadl={closeChildmoadl}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
