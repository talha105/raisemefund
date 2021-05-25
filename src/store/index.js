import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import user from "./reducer/user"
import userId from "./reducer/userId"
import userCampaiges from "./reducer/userCampaiges"
import campaiges from "./reducer/campaiges"
import donors from "./reducer/donors"
import cat from "./reducer/getCat"
import searchCampaiges from "./reducer/searchCampaiges"
import profile from "./reducer/profile"
import notification from "./reducer/notification"
import badge from "./reducer/badge"
const reducers =combineReducers({
    user,
    userId,
    userCampaiges,
    campaiges,
    donors,
    cat,
    searchCampaiges,
    profile,
    notification,
    badge
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =createStore(reducers,{},composeEnhancers(applyMiddleware(ReduxThunk)));


export default store