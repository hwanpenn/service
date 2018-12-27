import LoginPage from "views/LoginPages/LoginPage.jsx";
import Fingerprint from "@material-ui/icons/Fingerprint";
// import LockOpen from "@material-ui/icons/LockOpen";
// import FaceIdPage from "views/LoginPages/FaceIdPage";

const pagesRoutes = [
  {
    path: "/cms/login/normal",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  // {
  //   path: "/cms/login/faceid",
  //   name: "Login Page",
  //   short: "FaceId",
  //   mini: "LP",
  //   icon: LockOpen,
  //   component: FaceIdPage
  // },
  {
      redirect: true,
      path: "/cms/login",
      pathTo: "/cms/login/normal",
      name: "Register"
  },
];

export default pagesRoutes;
