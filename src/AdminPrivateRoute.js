import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import MasterLayout from "./Layout/admin/MasterLayout";

import axios from "axios";

export default function AdminPrivateRoute({ ...res }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("api/checkingAuthenticated").then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      
      }
    
      setLoading(false);
    
      
    });
    return () => {
      setAuthenticated(false);
      
    };
  }, []);
   axios.interceptors.response.use(
     undefined,
     function axiosRetryInterceptor(err) {
       if (err.response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        localStorage.removeItem('auth_image');
        setAuthenticated(false);
       
        history.push("/");
       }
       return Promise.reject(err);
     }
   );
    axios.interceptors.response.use(function (response){
      return response;
    },function (error){
      if( error.response.status ==403 ) //access denied
      {
      history.push('/Error/Page403');
    
      }
      else if( error.response.status ==404 ) //Page Not Founded
      {
      history.push('/Error/Page404');
  
      }
      return Promise.reject(error);
    })
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Route
      {...res}
      render={({ props, location }) =>
        authenticated ? (
          <MasterLayout {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: location } }}
          />
        )
      }
    />
  );
}
