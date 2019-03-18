import OfficialHomePage from "layouts/OfficialHomePage.jsx";
import LoginPages from "layouts/LoginPages.jsx";
import HomePages from "layouts/HomePages.jsx";


const indexRoutes = [
    {
        path: "/cms/official",
        name: "officialHome ",
        short: "officialHome",
        mini: "OP",
        component: OfficialHomePage
    },
    {
        path: "/cms/login",
        name: "Login ",
        short: "Login",
        mini: "LP",
        component: LoginPages
    },
    {
      path: "/cms/home",
      name: "Home",
      short: "Home",
      mini: "HP",
      component: HomePages
    },
    // {
    //   path: "/cms/home",
    //   redirect: true,
    //   pathTo: "/cms/home/tables/user",
    //   name: "Register"
    // },
    {
      path: "*",
      redirect: true,
      // pathTo: "/cms/login",
      pathTo:"/cms/official",
      name: "Register"
    },
];

export default indexRoutes;
