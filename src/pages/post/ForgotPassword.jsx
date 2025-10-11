import { useState } from "react";
import axios from  "../../utils/axiosInstance";
import { toast } from "react-toastify";
import sendCodeValidator from "../../validators/sendCodeValidators";
import recoverPasswordValidator from "../../validators/recoverPasswordValidator";
import { useNavigate } from "react-router-dom";
const initialFormData={email:"",code:"",password:""}
const initialFormError={code:"" ,password:""}

const ForgotPassword=()=>{
    const[formData,setFormData]=useState(initialFormData)
    const[formError,setFormError]=useState(initialFormError)
    const[loading,setLoading]=useState(false);
    const[emailError,setEmailError]=useState("");
    const[hasEmail,setHasEmail]=useState(false)

    const navigate=useNavigate();
    const handleChange=(event)=>{
        setFormData((prev)=>({...prev,[event.target.name]:event.target.value}))
    }
    const handleSendCode=async(e)=>{
        e.preventDefault();

        const errors=sendCodeValidator({email: formData.email});

        if(errors.email){
            setEmailError(errors.email);

        }else{
            try {
                setLoading(true);

                //api request 
               
                const response=await axios.post("/auth/forgot-password-code",{email:formData.email});
                const data=response.data;

                setHasEmail(true);
                
                toast.success(data.message,{
                    position:"top-right",
                    autoClose:true
                })

                
                
                setLoading(false)
                
            } catch (error) {
                setLoading(false)
                const response=error.response;
                const data=response.data;
                toast.error(data.message,{
                    position:"top-right",
                    autoClose:true
                })
                
                
            }
        }
    }
    const handleRecoverPassword=async(event)=>{
            event.preventDefault();
            const errors=recoverPasswordValidator({code:formData.code,password:formData.password})
            if(errors.code || errors.password ){
                setFormError(errors)
            }else{
                try {
                    setLoading(true);
    
                    //api request 
                    
                    const response=await axios.post("/auth/recover-password",formData);
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
          
    
        }
    return(
        <div>
            <div className="form-container">
                <form className="inner-container" onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword} >
                    <h2 className="form-title">{`${!hasEmail ? "recover password":"New Password"}`}</h2>

                    {!hasEmail ?( <div className="form-group">
                        <label>Email</label>  
                        <input type="text"
                        className="form-control"
                        name="email"
                        placeholder="enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        />
                        {emailError && <p className="error">{emailError}</p>}
                    </div>
                        ):(<>
                         <div className="form-group">
                        <label>code</label>
                        <input type="text"
                        className="form-control"
                        name="code"
                        placeholder="enter the code"
                        value={formData.code}
                        onChange={handleChange}
                        />
                         {formError.code && <p className="error">{formError.code}</p>}
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password"
                        className="form-control"
                        name="password"
                        placeholder="enter the code"
                        value={formData.password}
                        onChange={handleChange}
                        />
                         {formError.password && <p className="error">{formError.password}</p>}
                    </div>
                        </>)}

                   
                   

                    <div className="form-group">
                        <input className="button" type="submit" value={`${loading ? "sending...":"Send"}`} />
                    </div>

                </form>
                
            </div>
        </div>
    );
};
export default ForgotPassword;