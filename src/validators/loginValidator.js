const isEmail=(email)=>
    String(email).toLowerCase().match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
const loginValidator=({email,password})=>{
    const errors={
       
        email:"",
        password:""
       
    }

    
    if(!email){
        errors.email="Email is required"
    }else if(!isEmail(email)){
        errors.email="invalid email"
    }

    if(!password){
        errors.password="password is Required"
    }

    

    return errors;

}
export default loginValidator;