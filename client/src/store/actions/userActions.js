import API from "../../utils/API"


export const getUser = (currentUser) =>  {

return(dispatch, getState) => {
    console.log(currentUser)
   
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
                screenName:newUser.screenName,
                age:newUser.age,
                userPic:"https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Frootsicon.jpg?alt=media&token=f8f88ae3-3534-4591-b72e-1f92eb9d40f4" 

        })
            .then(res => {
                dispatch({type:"CREATE_USER",newProfile:res.data})
                API.saveScreenName({
                    firstname:res.data.firstname,
                    lastname:res.data.lastname,
                    user_ID:res.data._id,
                    screenName:res.data.screenName
                    
                })
            })          
            .catch(err => console.log(err));
       
    }
    
    }

 
    