import {
    GET_NOTIFICATION
    } from "../action/type"
    
    
    const initialState={loading:true};
    
    
export default function notification(state=initialState,action){
    switch(action.type){
        case GET_NOTIFICATION:
            return action.payload;
        default :
            return state
    }
}