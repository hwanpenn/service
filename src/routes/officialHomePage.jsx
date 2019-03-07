import OfficialHomePage from "views/LoginPages/OfficialHomePage.jsx";
// import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
// import FaceIdPage from "views/LoginPages/FaceIdPage";

const pagesRoutes2 = [
    {
        path: "/cms/official/OfficialHomePage",
        name: "OfficialHome Page",
        short: "OfficialHome",
        mini: "LP",
        icon: LockOpen,
        component: OfficialHomePage
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
        path: "/cms/official",
        pathTo: "/cms/official/OfficialHomePage",
        name: "Register"
    },
];

export default pagesRoutes2;
