import {
USER_CAMPAIG
} from "../action/type"


const initialState=false;


export default function userCampaiges(state=initialState,action){
    switch(action.type){
        case USER_CAMPAIG:
            return action.payload.reverse();
        default :
            return state
    }
}