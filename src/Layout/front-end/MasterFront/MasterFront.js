import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";

import homeroutes from "../../../routes/homeroutes";
import axios from "axios";
export default function MasterFront() {
  return (
    <div dir="rtl">
      <Navbar />

      <div className="container-fluid m-0 p-0 ">
        <Switch>
          {homeroutes.map((routes, dx) => {
            return (
              routes.component && (
                <Route
                  key={dx}
                  path={routes.path}
                  exact={routes.exact}
                  name={routes.name}
                  render={(props) => <routes.component {...props} />}
                />
              )
            );
          })}
          {/* <Redirect from="/" to="/massaha" /> */}
        </Switch>
      </div>
      <Footer />
      <a
        className="scroll-to-top rounded"
        style={{ backgroundColor: "#2249bebb" }}
        href="#page-top"
      >
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
