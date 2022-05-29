import React, { useState, useEffect } from "react";
import "./Community.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import parse from 'html-react-parser'
import SmLoading from "../../../../Layout/admin/SmLoading/SmLoading";
export default function Community(props) {

  let { category } = useParams();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const changePage = (data) => {
    getData(data.selected + 1);
    console.log(data.selected + 1);
  };
  console.log(category);
  const getData = (pagNumber = 1) => {
    const url = `/api/Category/${category}?page=${pagNumber}`;
    axios.get(url).then((res) => {
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      }
    });
  };


  
  console.log(data);
  useEffect(() => {
    getData();

    axios.get("/api/home-data").then((res) => {
      if (res.data.status == 200) {
        // props.funcLoading(false);
        setNewData(res.data.newposts);
      
        setLoading(false);
      }
    });

  }, [category]);
  if (loading) {
    return <SmLoading />;
  }
  const { datas, current_page, per_page, total } = data;
  return (
    <section className="container-fluid main_containt">
      <div className="row ">
        <div className="col-md-8">
          <div className="card p-0 m-0 border-0 pb-0 ">
            <div className="card-header  card-header-newData cairo ">
              <span className="header-mark mx-2"></span>
              <h4 className="">{category}</h4>
            </div>

            <div className="card-body p-3 m-0">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  {data.data.map((da) => {
                    return (
                      <div key={da.id} className="col-lg-6 col-md-6 col-sm-12 p-2">
                        <Link to={`/${da.categoryName}/${da.id}`}>
                          <div className="card w-100 p-0">
                            <div className="card-header w-100 p-0">
                              <img
                                className="card-img-top w-100"
                                style={{height:'13rem'}}
                                src={`/uploads/share/Posts/${da.images}`}
                                alt="No Image"
                              />
                            </div>
                            <div className="card-body">
                              <div className="card-text">
                                {parse(da.description.substr(0,200)) }
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="card-footerm-0 my-2  p-0 pb-0">
              <ReactPaginate
                activePage={current_page}
                previousLabel={"Pre"}
                nextLabel={"Next"}
                breakLable={"..."}
                pageCount={total/per_page}
                itemsPerPage={per_page}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                activePage={current_page}
                onPageChange={changePage}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-0 m-0 border-0">
            <div className="card-header  card-header-newData cairo ">
              <span className="header-mark mx-2"></span>
              <h4 className="">الأكثر قراءة</h4>
            </div>
            <div className="card-body ">
                {newData.map((da) => {
                  return (
                    <Link to={`/${da.categoryName}/${da.id}`}  key={da.id}>
                      <div className="card_data container">
                        <div className="card_data_image">
                          <img src={`/uploads/share/Posts/${da.images}`} alt="No Image" />
                        </div>
                        <div className="card_data_text roboto">
                          <h5>{da.name.substr(0, 70) + "..."}</h5>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
