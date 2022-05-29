import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./components/admin/Auth/Login";
import PublicRoute from "./PublicRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ModeratorPrivateRoute from './ModeratorPrivateRoute'

import Page403 from './Layout/Errors/Page403'
import Page404 from './Layout/Errors/Page404'
import {HelmetProvider} from 'react-helmet-async'

axios.defaults.baseURL = "http://127.0.0.1:8000/";
// https://www.massaha.info/apimassaha/public

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});








function App() {
  return (
    <>
    <HelmetProvider>
      <Router>
      
        <Switch>
        <Route exact path="/Error/page403" component={Page403}/>
        <Route exact path="/Error/page404" component={Page404}/>
          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/admin/dashboard" />
            ) : (
              <Login />
            )}
          </Route>
          <AdminPrivateRoute path="/admin" name="admin" />
          <ModeratorPrivateRoute path="/moderator" name="moderator" />
          <PublicRoute path="/" name="home" />

       
        </Switch>
      </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
