import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../../routes/routes";
import $ from "jquery";

function MasterLayout() {
  const jj = () => {
    $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").collapse("hide");
      }
    });
    $("body.fixed-nav .sidebar").on(
      "mousewheel DOMMouseScroll wheel",
      function (e) {
        if ($(window).width() > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      }
    );
  };

  // Close any open menu accordions when window is resized below 768px
  useEffect(() => {
    jj();
    $(window).resize(function () {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
    });
  }, []);
  return (
    <div id="wrapper" style={{ position: "relative" }}>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid m-0 p-0 pt-0 mt-0">
            <Switch>
              {routes.map((route, dx) => {
                return (
                  route.component && (
                    <Route
                      key={dx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  )
                );
              })}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MasterLayout;
