import {
    SEARCH_CAT
    } from "../action/type"
    
    
    const initialState={};
    
    
    export default function searchCampaiges(state=initialState,action){
        switch(action.type){
            case SEARCH_CAT:
                return action.payload
            default :
                return state
        }
    }