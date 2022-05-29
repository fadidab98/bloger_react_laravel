import Dashboard from "../components/moderator/Dashboard/Dashboard";
import Login from "../components/admin/Auth/Login";
import Category from "../components/admin/Category/Category";
import Details from "../components/moderator/Post/Details/Details";
import Post from "../components/moderator/Post/Post";
import Profile from "../components/moderator/Profile/Profile";
const modaretorRoutes = [
  {
    path: "/moderator",
    exact: true,
    name: "moderator",
  },
  {
    path: "/moderator/Profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/moderator/dashboard",
    exact: true,
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/moderator/Posts",
    exact: true,
    name: "Posts",
    component: Post,
  },
  {
    path: "/moderator/:category/:id",
    exact: true,
    name: "Details",
    component: Details,
  },
];
export default modaretorRoutes;
