

import tablesRobotMng from "views/Tables/tablesRobotMng.jsx";
import tablesChatMng from "views/Tables/tablesChatMng.jsx";
import tablesML from "views/Tables/tablesML.jsx";
import tablesDialog from "views/Tables/tablesDialog.jsx";
import tablesKnowladgeMng from "views/Tables/tablesKnowladgeMng.jsx";
import tablesKillGroupMng from "views/Tables/tablesKillGroupMng.jsx";
import tablesSecretKey from "views/Tables/tablesSecretKey.jsx";
import tablesArticleMng from "views/Tables/tablesArticleMng.jsx";
import tablesKilGroupHidden from "views/Tables/tablesKilGroupHidden.jsx";
import tablesComplaintMng from "views/Tables/tablesComplaintMng.jsx";
import tablesMyCompany from "views/Tables/tablesMyCompany.jsx";
import Apps from "@material-ui/icons/Apps";
import ContentPaste from "@material-ui/icons/ContentPaste";
import LockOpen from "@material-ui/icons/LockOpen";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

const dashRoutes = [
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "机器人",
        state: "openTables1",
        icon: Apps,
        views: [
            {
            path: "/cms/home/tables/chatmng",
            name: "聊天窗管理",
            mini: "N",
            component: tablesChatMng
            },
            {
            path: "/cms/home/tables/robotmng",
            name: "机器人管理",
            mini: "B",
            component: tablesRobotMng
            },
            {
            path: "/cms/home/tables/ml",
            name: "机器学习",
            mini: "P",
            component: tablesML
            },
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "知识库",
        state: "openTables2",
        icon: ContentPaste,
        views: [
            {
                path: "/cms/home/tables/knowladgemng",
                name: "知识库管理",
                mini: "RF",
                component: tablesKnowladgeMng
            },
            {
                path: "/cms/home/tables/articlemng",
                name: "文章详情",
                mini: "RF",
                // status: "hidden",
                component: tablesArticleMng
            },
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "统计查询",
        state: "openTables5",
        icon: LockOpen,
        views: [
            {
                path: "/cms/home/tables/dialog",
                name: "对话详情",
                mini: "GS",
                component: tablesDialog
                },
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "客服管理",
        state: "openTables3",
        icon: WidgetsIcon,
        views: [
            {
                path: "/cms/home/tables/killgroup",
                name: "技能组管理",
                mini: "RT",
                component: tablesKillGroupMng
            },
            {
                path: "/cms/home/tables/groupdetail",
                name: "技能组详情",
                mini: "RT",
                status: "hidden",
                component: tablesKilGroupHidden
            },
            {
                path: "/cms/home/tables/mycompany",
                name: "管理员管理",
                mini: "RT",
                component: tablesMyCompany
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
        collapse: true,
        path: "/cms/home/tables",
        name: "投诉建议",
        state: "openTables4",
        icon: Timeline,
        views: [
            {
                path: "/cms/home/tables/complaint",
                name: "投诉建议管理",
                mini: "RT",
                component: tablesComplaintMng
            }
        ]
    },
    {
        redirect: true,
        path: "/cms/home",
        pathTo: "/cms/home/tables/chatmng",
        name: "Register"
    },
];
export default dashRoutes;
