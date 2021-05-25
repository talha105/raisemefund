import {
    BADGE_INCREMENT
    } from "../action/type"
    
    
    const initialState=0;
    
    
    export default function badge(state=initialState,action){
        switch(action.type){
            case BADGE_INCREMENT:
                return action.payload+state;
            default :
                return state
        }
    }