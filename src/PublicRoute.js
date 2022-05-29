import React from "react";
import { Route } from "react-router-dom";
import MasterFront from "./Layout/front-end/MasterFront/MasterFront";
export default function PublicRoute({ ...rest }) {
  return <Route {...rest} render={(props) => <MasterFront {...props} />} />;
}
