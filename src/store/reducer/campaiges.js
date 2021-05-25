import {
    CAMPAIGES,
    REFRESH_CAMPAIGES
    } from "../action/type"
    
    
    const initialState=[];
    
    
    export default function userCampaiges(state=initialState,action){
        switch(action.type){
            case CAMPAIGES:
                return [...state,...action.payload];
            case REFRESH_CAMPAIGES:
                return action.payload
            default :
                return state
        }
    }