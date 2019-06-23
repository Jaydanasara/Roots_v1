import API from "../../utils/API"


export const getUser = (currentUser) =>  {

return(dispatch, getState) => {
   
    API.getUserInfo({
        
        emailaddress:currentUser.emailaddress,
        password: currentUser.password
               
        
    })

    .then(res =>  {
       
                dispatch({type:"USER_PROFILE",userPro:res.data[0]})
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
                screenName:newUser.screenName

        })
            .then(res => {
                dispatch({type:"CREATE_USER",newProfile:res.data})
            })          
            .catch(err => console.log(err));
       
    }
    
    }