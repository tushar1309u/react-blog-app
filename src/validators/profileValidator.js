const isEmail=(email)=>
    String(email).toLowerCase().match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
const profileValidator=({name,email})=>{
    const errors={
        name:"",
        email:"",
       
    }

    if(!name){
        errors.name="Name is required"
    }
    if(!email){
        errors.email="Email is required"
    }else if(!isEmail(email)){
        errors.email="invalid email"
    }

    

    return errors;

}
export default profileValidator;