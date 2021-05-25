import {
    GET_CAT
    } from "../action/type"
    
    
    const initialState=[];
    
    
    export default function cat(state=initialState,action){
        switch(action.type){
            case GET_CAT:
                return action.payload;
            default :
                return state
        }
    }