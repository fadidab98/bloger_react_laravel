import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddForm.css";
import axios from "axios";
toast.configure();
function AddForm(props) {
  const [modal, setModal] = useState(false);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",

    error_message: [],
  });
  const [status, setStatus] = useState("1");
  const [role, setRole] = useState("1");
  const [picture, setPecture] = useState({ image: "" });
  const inputHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const radioHandler = (e) => {
    setStatus(e.target.value);
  };
  const radioRoleHandler = (e) => {
    setRole(e.target.value);
  };

  const inputImage = (e) => {
    setPecture({ image: e.target.files[0] });
  };
  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("status", status);
    formData.append("role", role);
    formData.append("image", picture.image);

    axios.post("api/add-user", formData).then((res) => {
      if (res.data.status === 200) {
        setModal(true);
        props.closeModalFunction();
        toast.success("Success");
      } else {
        setInputData({ ...inputData, error_message: res.data.message_error });
        toast.error("Error");
      }
    });
  };

  return (
    <form onSubmit={submitForm} encType="multipart/form-data">
      <div className="form-outline">
        <label className="form-label" htmlFor="Name">
          User Name
        </label>
        <input
          type="text"
          id="Name"
          name="name"
          value={inputData.name}
          onChange={inputHandler}
          className="form-control"
          dir="rtl"
        />
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.name : ""}
        </p>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3ExampleEmail">
          Email
        </label>
        <input
          id="form3ExampleEmail"
          className="form-control"
          name="email"
          value={inputData.description}
          onChange={inputHandler}
        />
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.email : ""}
        </p>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3ExamplePassword">
          Password
        </label>
        <input
          id="form3ExamplePassword"
          className="form-control"
          name="password"
          value={inputData.password}
          onChange={inputHandler}
        />
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.password : ""}
        </p>
      </div>
      <div className="d-flex mt-2 ">
        <label className="pe-3">Status :</label>
        <div className="mx-4">
          <input
            className="form-check-input me-3"
            type="radio"
            value="1"
            onChange={radioHandler}
            id="flexRadioDefault1"
            name="status"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
          Unblocked
          </label>
        </div>
        <div className="mx-4">
          <input
            className="form-check-input"
            type="radio"
            onChange={radioHandler}
            value="0"
            id="flexRadioDefault2"
            name="status"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
          Blocked
          </label>
        </div>
      </div>
      <div className="d-flex mt-2 ">
        <label className="pe-3">Role :</label>
        <div className="mx-4">
          <input
            className="form-check-input me-3"
            type="radio"
            value="1"
            onChange={radioRoleHandler}
            id="flexRadioDefault1"
            name="role"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Admin
          </label>
        </div>
        <div className="mx-4">
          <input
            className="form-check-input"
            type="radio"
            onChange={radioRoleHandler}
            value="0"
            id="flexRadioDefault2"
            name="role"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Modorator
          </label>
        </div>
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example4">
          Image
        </label>
        <input
          type="file"
          name="image"
          onChange={inputImage}
          id="form3Example4"
          dir="rtl"
          className="form-control"
        />
        <p className="text-danger">
          {inputData.error_message ? inputData.error_message.image : ""}
        </p>
      </div>
      <div className="modal-footer border-0">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.closeModalFunction}
        >
          Close
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default AddForm;
