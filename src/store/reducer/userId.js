import {
    USER_ID
    } from "../action/type"
    
    
    const initialState="";
    
    
    export default function userID(state=initialState,action){
        switch(action.type){
            case USER_ID:
                return action.payload;
            default :
                return state
        }
    }