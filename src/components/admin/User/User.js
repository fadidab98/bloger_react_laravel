import React, { useState, useEffect } from "react";
import Table from "./Table";
import axios from "axios";
import SmLoading from "../../../Layout/admin/SmLoading/SmLoading";
import Cookies from "js-cookie";
import "./Users.css";
import AddForm from "./AddForm";
import { useHistory } from "react-router-dom";
export default function User() {
  const history = useHistory();
  const [datas, setDatas] = useState([]);

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [refreshPage,setRreshPage]=useState(1); 
  const changeState=(data)=>{
    setRreshPage(refreshPage+data);
  }
  const openModalFunction = () => {
    setOpenModal(true);
  };
  const closeModalFunction = () => {
    setOpenModal(false);
  };
  const id = Cookies.get("id");
  console.log(id);
  useEffect(() => {
    setTimeout(() => {
      axios.get(`api/users/${id}`).then((res) => {
        if (res.data.status === 200) {
          setDatas(res.data);
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
        else {
          setMessage(res.data.message);
        }
      });
    }, 2000);
  }, [openModal,refreshPage]);

  if (loading) {
    return <SmLoading />;
  }

  return (
    <div className="card m-0 p-0">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div aria-label="breadcrumb bg-light">
            <ol className="breadcrumb p-0 m-0 bg-light ">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Users
              </li>
            </ol>
          </div>
          <button
            onClick={openModalFunction}
            type="button"
            className="btn btn-primary btn-icon-split p-0 rounded-pill"
          >
            <span className="icon text-white-100 m-0">
              <i className="fas fa-plus"></i>
            </span>
          </button>
        
        </div>
      </div>
      <div className="card-body">
      

        <Table data={datas} message={message}  changeState={changeState}/>
      </div>

     \
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
            <div className="modal-body ">
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
