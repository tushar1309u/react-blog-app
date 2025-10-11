import signupValidator from "../../validators/signupValidator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from  "../../utils/axiosInstance";
import { toast } from "react-toastify";



const initialFormData={name:"",email:"",password:"",confirmPassword:""}
const initialFormError={name:"",email:"",password:"",confirmPassword:""}

const Signup=()=>{
    const[formData,setFormData]=useState(initialFormData)
    const[formError,setFormError]=useState(initialFormError)
    const[loading,setLoading]=useState(false);

    const navigate=useNavigate();
    const handleChange=(event)=>{
        setFormData((prev)=>({...prev,[event.target.name]:event.target.value}))
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const errors=signupValidator({name:formData.name,email:formData.email,password:formData.password,confirmPassword:formData.confirmPassword})
        if(errors.name ||errors.email || errors.password || errors.confirmPassword){
            setFormError(errors)
        }else{
            try {
                setLoading(true);

                //api request 
                const requestBody={
                    name:formData.name,
                    email:formData.email,
                    password:formData.password
                }
                const response=await axios.post("/auth/signup",requestBody);
                const data=response.data;
                
                toast.success(data.message,{
                    position:"top-right",
                    autoClose:true
                })

                setFormData(initialFormData)
                setFormError(initialFormError)
                
                setLoading(false)
                navigate("/login")
            } catch (error) {
                setFormError(initialFormError)
                setLoading(false)
                const response=error.response;
                const data=response.data;
                toast.error(data.message,{
                    position:"top-right",
                    autoClose:true
                })
                
                
            }
           
        }
        console.log(formData);

    }
    return(
        <div className="form-container">
         <form className="inner-container" onSubmit={handleSubmit}>
            <h2 className="form-title">Signup form</h2>
            <div className="form-group">
                <label >Name</label>
                <input type="text" name="name" placeholder="Jhon Doe" value={formData.name} onChange={handleChange}/>
                {formError.name && <p className="error">{formError.name}</p>}
            </div>
            <div className="form-group">
                <label >Email</label>
                <input type="email" name="email" placeholder="doe@gmail.com" value={formData.email} onChange={handleChange}/>
                {formError.email && <p className="error">{formError.email}</p>}
                
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password" name="password" placeholder="Enter Your password" value={formData.password} onChange={handleChange}/>
                {formError.password && <p className="error">{formError.password}</p>}
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="confirm password" value={formData.confirmPassword} onChange={handleChange}/>
                {formError.confirmPassword && <p className="error">{formError.confirmPassword}</p>}
            </div>
            <div className="form-group">
                <input type="submit" className="button" value={`${loading ? "saving...":"Signup"}`} />
            </div>
         </form>
        </div>
    )

}
export default Signup;