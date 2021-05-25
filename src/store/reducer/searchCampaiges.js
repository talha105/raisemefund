import {
    SEARCH_CAT,
    CLEAR_SEARCH_RESULT
    } from "../action/type"
    
    
    const initialState={loading:true};
    
    
    export default function searchCampaiges(state=initialState,action){
        switch(action.type){
            case SEARCH_CAT:
                return action.payload
            case CLEAR_SEARCH_RESULT:
                console.log(action.payload)
                return action.payload
            default :
                return state
        }
    }