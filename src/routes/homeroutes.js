import Home from "../components/front-end/Home/Home";
import Category from "../components/front-end/Categories/Category";
import Details from "../components/front-end/Details/Details";
import About from "../components/front-end/About/About";
// import Health from "../components/front-end/Community/Community";
const homeroutes = [
  {
    path: "/",
    exact: true,
    name: "home",
    component: Home,
  },
  {
    path: "/About",
    exact: true,
    name: "About",
    component: About,
  },
  {
    path: "/:category",
    exact: true,

    name: "category",
    component: Category,
  },
  
 
  {
    path: "/:category/:id",
   

    name: "Details",
    component: Details,
  },
  {
    path: "/About",
    exact: true,
    name: "About",
    component: About,
  },
  
  // {
  //   path: "/Health",
  //   exact: true,
  //   name: "Health",
  //   component: Health,
  // },
];
export default homeroutes;
