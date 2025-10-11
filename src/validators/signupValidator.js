const isEmail=(email)=>
    String(email).toLowerCase().match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
const signupValidator=({name,email,password,confirmPassword})=>{
    const errors={
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    }

    if(!name){
        errors.name="Name is required"
    }
    if(!email){
        errors.email="Email is required"
    }else if(!isEmail(email)){
        errors.email="invalid email"
    }

    if(!password){
        errors.password="password is Required"
    }else if(password.length<6){
        errors.password="password should be six char long"
    }

    if(password !== confirmPassword){
        errors.confirmPassword="Password doesnt match"
    }

    return errors;

}
export default signupValidator;