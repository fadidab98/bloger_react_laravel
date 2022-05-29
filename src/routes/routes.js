import Dashboard from "../components/admin/Dashboard/Dashboard";
import Login from "../components/admin/Auth/Login";
import Category from "../components/admin/Category/Category";
import Users from "../components/admin/User/User";
import Post from "../components/admin/Post/Post";
import Details from "../components/admin/Post/Details/Details";
import CategoryDetails from "../components/admin/Category/CategoryDetails/CategoryDetails";
import WebInfo from '../components/admin/WebSetting/WebInfo/WebInfo'
import AboutUs from "../components/admin/WebSetting/AboutUs/AboutUs";
import UserDetails from "../components/admin/User/UserDetails/UserDetails";
import Profile from "../components/admin/Profile/Profile";
const routes = [
  {
    path: "/admin",
    exact: false,
    name: "admin",
  },
  {
    path: "/admin/Profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/admin/Users/:id",
    exact: true,
    name: "UserDetails",
    component: UserDetails,
  },
  {
    path: "/admin/Category_show/:id",
    exact: true,

    name: "CategoryDetails",
    component: CategoryDetails,
  },
  {
    path: "/admin/:category/:id",
    exact: true,

    name: "Details",
    component: Details,
  },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/Category",
    exact: true,
    name: "Category",
    component: Category,
  },
  {
    path: "/admin/Users",
    exact: true,
    name: "Users",
    component: Users,
  },
  
  {
    path: "/admin/Post",
    exact: true,
    name: "Post",
    component: Post,
  },
  {
    path: "/admin/WebInfo",
    exact: true,
    name: "WebInfo",
    component: WebInfo,
  },
  {
    path: "/admin/AboutUs",
    exact: true,
    name: "AboutUs",
    component: AboutUs,
  },
];
export default routes;
