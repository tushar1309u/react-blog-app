const changePasswordValidator=({oldPassword,newPassword})=>{
    const errors={
        oldPassword:"",
        newPassword:""
    }
    if(!oldPassword){
        errors.oldPassword="oldPassword is required"
    }
    if(!newPassword){
        errors.newPassword="new password is required"
    }else if(newPassword.length <6){
        errors.newPassword="Password should be six character long"
    }

    if(oldPassword && oldPassword===newPassword){
        errors.newPassword="you providing old password"
    }
    return errors;
};
export default changePasswordValidator;