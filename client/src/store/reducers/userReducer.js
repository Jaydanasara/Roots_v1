const initState ={
    
        userProfile:{
        user_ID:"",
        firstname:"",
        lastname:"",
        emailaddress:"",
        password: "",
        screenName:"",
        scrUser_id:"",
        userPic:"",
        friends:[],
        messages:[],
        notifications:[],
        }

}

const userReducer = (state = initState,action)=>{
    switch(action.type){
        case "CREATE_USER" :
        console.log("created User", action.newProfile)
        return {
            userProfile:{
            firstname:action.newProfile.firstname,
            lastname:action.newProfile.lastname,
            emailaddress:action.newProfile.emailaddress,
            password: action.newProfile.password,
            screenName:action.newProfile.screenName,
            user_ID:action.newProfile._id
            }

        }



        case "USER_PROFILE":
        console.log("User", action.userPro)
        return {
            userProfile:{


            firstname:action.userPro.firstname,
            lastname:action.userPro.lastname,
            emailaddress:action.userPro.emailaddress,
            password: action.userPro.password,
            screenName:action.userPro.screenName,
            scrUser_id:action.userPro.scrUser_id,
            userPic:action.userPro.userPic,
            user_ID:action.userPro._id,
            friends:action.userPro.friends,
            messages:action.userPro.messages,
            notifications:action.userPro.nootifications,
           }
        }
        
        default:
        return state;

    }
       

}


export default userReducer