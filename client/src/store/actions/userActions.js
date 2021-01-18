import API from "../../utils/API"


export const getUser = (currentUser) =>  {

return(dispatch, getState) => {
    console.log(currentUser)
   
    API.getUserInfo({
        
        emailaddress:currentUser
        // password: currentUser.password
               
        
    })

    .then(res =>  {
                console.log(res.data)
                dispatch({type:"USER_PROFILE",userPro:res.data})
                
            })
    .catch(err => console.log(err));
    
   
}

}

export const createUser = (newUser) =>  {
console.log(newUser)
    return(dispatch, getState) => {
        API.saveName({
            firstname:newUser.firstname,
                lastname: newUser.lastname,
                emailaddress: newUser.emailaddress,
                password: newUser.password,
                screenName:newUser.screenName,
                age:newUser.age,
                messages:[],
                notifications:[]
               

        })
            .then(res => {
                dispatch({type:"CREATE_USER",newProfile:res.data})
                console.log(res.data)
                API.saveScreenName({
                    firstname:res.data.firstname,
                    lastname:res.data.lastname,
                    user_ID:res.data._id,
                    screenName:res.data.screenName,
                    messages:[],
                    notifications:[]
                    
                })
                .then(response=>{
                    console.log(response.data)
                    API.addScrId({
                        user_ID:res.data._id,
                        scrUserId:response.data._id

                    })
                    .then(res=>{
                        console.log(res)
                    })

                })
            })          
            .catch(err => console.log(err));
       
    }
    
    }

 
    