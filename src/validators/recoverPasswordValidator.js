const recoverPasswordValidator=({code,password})=>{
    const errors={
        code:"",
        password:""
    };


    if(!code){
        errors.code="code is required"
    }

    if(!password){
        errors.password="Password is required"
    }else if(password.length <6){
        errors.password="password mustbe atleast six characters"
    }

    return errors;
}
export default recoverPasswordValidator;