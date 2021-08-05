import axios from "axios"
import {api} from "../../config/config.json"
import {
    LOGIN,
    USER_CAMPAIG,
    USER_ID,
    CAMPAIGES,
    REFRESH_CAMPAIGES,
    DONOR_LIST,
    GET_CAT,
    SEARCH_CAT,
    GET_PROFILE,
    GET_NOTIFICATION,
    BADGE_INCREMENT
} from "./type"
import AsyncStorage from "@react-native-community/async-storage"



export const registration=(data,renderLoader,renderModel)=>async dispatch=>{
    const res=await axios.post(`${api}/signup`,data)

    if(res.data.api_status){
        renderModel('show')
    }
    renderLoader('hide')
}


export const login=(data,renderLoader,setUser)=>async dispatch=>{
    const res=await axios.post(`${api}/login`,data)

    if(res.data.api_status=="true"){
        dispatch({
            type:LOGIN,
            payload:res.data.data
        })
        await AsyncStorage.setItem('USER_ID',res.data.data.id.toString())
        renderLoader('hide')
        setUser(res.data.data.id.toString())
    }else{
        dispatch({
            type:LOGIN,
            payload:res.data
        })
        renderLoader('hide')
    }
}


export const setUserId=(userId)=>async dispatch=>{
    dispatch({
        type:USER_ID,
        payload:userId
    })
}

export const fetchUserCampaiges=(userId)=>async dispatch=>{
    const res=await axios.post(`${api}/user_campaign`,{
        user_id:userId
    })
    dispatch({
        type:USER_CAMPAIG,
        payload:res.data.data
    })
}


export const fetchCampaiges=(page)=>async dispatch=>{
    const res=await axios.get(`${api}/campaign-pagination`,{
        params:{
            page:page
        }
    })
    dispatch({
        type:CAMPAIGES,
        payload:res.data.data.data
    })
}
export const refreshCampaiges=()=>async dispatch=>{

    const res=await axios.get(`${api}/campaign-pagination`)

    dispatch({
        type:REFRESH_CAMPAIGES,
        payload:res.data.data.data
    })
}


export const donorList=(campaign_id)=>async dispatch=>{
    const res=await axios.post(`${api}/donor_list`,{
        campaign_id
    })

    if(res.data.api_status=="true"){
        dispatch({
            type:DONOR_LIST,
            payload:res.data.data
        })
    }else{
        dispatch({
            type:DONOR_LIST,
            payload:[]
        })
    }
}

export const getCat=()=>async dispatch=>{

    const res=await axios.get(`${api}/categories`)

    dispatch({
        type:GET_CAT,
        payload:res.data.data
    })

}

export const createCampaige=(data,renderModal,renderLoader)=>async dispatch=>{

    var file={
        uri:data.image_path.path,
        name:data.image_path.path.slice(data.image_path.path.lastIndexOf('/')+1,data.image_path.path.length),
        type:data.image_path.mime
    }
    const bodyForm=new FormData();
    bodyForm.append('category_id',data.category_id)
    bodyForm.append('user_id',data.user_id)
    bodyForm.append('title',data.title)
    bodyForm.append('description',data.description)
    bodyForm.append('amount',data.amount)
    // bodyForm.append('start_date',data.start_date)
    bodyForm.append('end_date',data.end_date)
    bodyForm.append('image_path',file)
    bodyForm.append('is_featured',data.is_featured)

    const res=await axios.post(`${api}/create_campaign`,bodyForm)

    if(res.data.api_status=="true"){
        renderLoader('hide')
        renderModal('show') 
    }else{
        alert("from server"+res.data.message)
        renderLoader('hide')
    }

}



export const searchByText=(text)=>async dispatch=>{
    const res=await axios.post(`${api}/search_campaign`,null,{
        params:{
            textstr:text
        }
    })

    dispatch({
        type:SEARCH_CAT,
        payload:res.data.data
    })

}
export const searchByCat=(text)=>async dispatch=>{
    const res=await axios.post(`${api}/search_category`,null,{
        params:{
            textstr:text
        }
    })

    dispatch({
        type:SEARCH_CAT,
        payload:res.data.data
    })

}


export const donateNow=(data,renderLoader,renderModal)=>async dispatch=>{

    const res=await axios.post(`${api}/donation`,data)
    if(res.data.api_status=="true"){
        renderModal('show')
    }
    else{
        renderLoader('hide')
        alert(res.data)
    }

}

export const getProfile=(id)=>async dispatch=>{

    const res=await axios.post(`${api}/user`,null,{
        params:{
            id
        }
    })

    dispatch({
        type:GET_PROFILE,
        payload:res.data.data
    })

}

export const updateProfile=(data,renderModel,renderLoader)=>async dispatch=>{
    
    const bodyForm=new FormData();
    bodyForm.append('name',data.name)
    bodyForm.append('organization',data.organization)
    bodyForm.append('address',data.address)
    bodyForm.append('user_id',data.user_id)

    if(data.profile_picture){
        var file={
            uri:data.profile_picture.path,
            name:data.profile_picture.path.slice(data.profile_picture.path.lastIndexOf('/')+1,data.profile_picture.path.length),
            type:data.profile_picture.mime
        }
        bodyForm.append('profile_picture',file)
    }

    const res=await axios.post(`${api}/update_profile`,bodyForm)
    
    

    if(res.data.api_status==="true"){
        renderModel(true)
        renderLoader(false)
    }

}

export const getNotifcation=(user_id)=>async dispatch=>{    
    const res=await axios.post(`${api}/notify`,{
        user_id
    })

    dispatch({
        type:GET_NOTIFICATION,
        payload:res.data.data.reverse()
    })
}

export const badgeIncrement=()=>async dispatch=>{
    dispatch({
        type:BADGE_INCREMENT,
        payload:1
    })

}

export const resetPassword=(email)=>async dispatch=>{

        const res=await axios.post(`${api}/password/email`,null,{
            params:{
                email:email
            }
        })
        return res.data
}