import React from "react";
import "./SmLoading.css";
import loading from "../../../assets/admin/img/loading.svg";
export default function SmLoading() {
  return (
    <div id="smloading">
      <img src={loading} />
      <h5 dir="ltr">Loading...</h5>
    </div>
  );
}
