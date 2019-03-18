import app from './reducers/app.js'
import tablesRobotMng from './reducers/tablesRobotMng.js'
import tablesDialog from './reducers/tablesDialog.js'
import tablesML from './reducers/tablesML.js'
import tablesArticleMng from './reducers/tablesArticleMng.js'
import tablesKnowladgeMng from './reducers/tablesKnowladgeMng.js'
// import tablesArticleMng from './reducers/tablesArticleMng.js'
import tablesSecretKey from './reducers/tablesSecretKey.js'
import tablesKillGroupMng from './reducers/tablesKillGroupMng.js'
import tablesKillGroupHidden from './reducers/tablesKillGroupHidden.js'
import tablesComplaintMng from './reducers/tablesComplaintMng.js'
import tablesAdmin from './reducers/tablesAdmin.js'
import tablesCategory from './reducers/tablesCategory.js'
import tablesCompany from './reducers/tablesCompany.js'
import tablesMyCompany from './reducers/tablesMyCompany.js'
import tablesChatMng from './reducers/tablesChatMng.js'
import {combineReducers} from 'redux'

export default combineReducers({
        app,
    tablesChatMng,
    tablesRobotMng,
    tablesDialog,
    tablesML,
    tablesArticleMng,
    tablesKnowladgeMng,
    tablesSecretKey,
    tablesKillGroupMng,
    tablesKillGroupHidden,
    tablesComplaintMng,
    tablesAdmin,
    tablesCategory,
    tablesCompany,
    tablesMyCompany,
    
})
