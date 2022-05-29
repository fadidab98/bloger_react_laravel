import React, { useState } from "react";

export default function Table(props) {
  const [message, setMessage] = useState(false);
  if (props.data.message !== "") {
    setMessage(true);
  }

  var x = 0;
  return (
    <table className="table table-hover text-center" dir="rtl">
      <thead>
        <tr>
          <th scope="col">#</th>
          {props.data.cols.map((col, index) => {
            return (
              <th scope="col" key={index}>
                {col}
              </th>
            );
          })}
          <th scope="col">status</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {message ? (
          <tr className="text-center">
            <td colSpan="6">{props.data.message}</td>
          </tr>
        ) : (
          props.data.data.map((da) => {
            return (
              <tr key={da.id}>
                <td>{x++}</td>
                <td>{da.name}</td>

                <td>{da.image}</td>
                <td>{da.description.substr(0, 6) + "..."}</td>
                <td>{da.created_at}</td>
                <td></td>
                <td>
                  <div className="d-flex justify-content-center ">
                    <a
                      href="#"
                      className="btn btn-danger rounded-circle btn-sm mx-1"
                    >
                      <i className="fas fa-trash"></i>
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary rounded-circle btn-sm mx-1"
                    >
                      <i className="fas fa-pen"></i>
                    </a>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
