import tablesAdmin from "views/Tables/tablesAdmin.jsx";
import tablesCategory from "views/Tables/tablesCategory.jsx";
import tablesCompany from "views/Tables/tablesCompany.jsx";
import tablesSecretKey from "views/Tables/tablesSecretKey.jsx";

import Apps from "@material-ui/icons/Apps";
import ContentPaste from "@material-ui/icons/ContentPaste";


const dashRoutes2 = [
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "企业管理",
        state: "openTables2",
        icon: ContentPaste,
        views: [
            {
                path: "/cms/home/tables/category",
                name: "企业分类",
                mini: "RF",
                component: tablesCategory
            },
            {
                path: "/cms/home/tables/company",
                name: "企业账户",
                mini: "EF",
                component: tablesCompany
            }
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "管理员账户",
        state: "openTables1",
        icon: Apps,
        views: [
            {
            path: "/cms/home/tables/user",
            name: "账户管理",
            mini: "B",
            component: tablesAdmin
            },
            {
                path: "/cms/home/tables/secretkey",
                name: "密钥管理",
                mini: "RT",
                component: tablesSecretKey
            },
        ]
    },
    {
        redirect: true,
        path: "/cms/home",
        pathTo: "/cms/home/tables/user",
        name: "Register"
    },
];
export default dashRoutes2;
