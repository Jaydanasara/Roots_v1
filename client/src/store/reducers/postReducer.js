import{get_post, new_post} from "../components/actions/types";

const initialState={
    userProfile:[],
    userCred:{},
    password:"",
    email:"",
    firstName: "",
    lastName: "",
    name: "",
    screenName:""


}

export default function(state= initialState,action){
    switch(action.type){
        case get_post:
      
        return {
            ...state,
            userProfile:action.payload
                   }
      
        case new_post:
        return{
            ...state,
            userCred:action.payload
        };
        default:
        return state;
    }
}