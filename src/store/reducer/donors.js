import {
    DONOR_LIST
    } from "../action/type"
    
    
    const initialState=false;
    
    
    export default function donor(state=initialState,action){
        switch(action.type){
            case DONOR_LIST:
                return action.payload;
            default :
                return state
        }
    }