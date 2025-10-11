import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from  "../../utils/axiosInstance";
import { toast } from "react-toastify";
import changePasswordValidator from "../../validators/changePasswordValidator";
import { useAuth } from "../../components/context/AuthContext";
const initialFormData={oldPassword:"",newPassword:""}
const initialFormError={oldPassword:"",newPassword:""}
const Setting=()=>{
    const[formData,setFormData]=useState(initialFormData)
    const[formError,setFormError]=useState(initialFormError)
    const[loading,setLoading]=useState(false);
    
    const navigate=useNavigate();
    const {auth}=useAuth();

    const handleChange=(event)=>{
        setFormData((prev)=>({...prev,[event.target.name]:event.target.value}))
    }

    const handleSubmit=async(event)=>{
                event.preventDefault();
                const errors=changePasswordValidator({oldPassword:formData.oldPassword,newPassword:formData.newPassword})
                if(errors.oldPassword|| errors.newPassword){
                    setFormError(errors)
                }else{
                    try {
                        setLoading(true);
        
                        //api request 
                        
                        const response=await axios.put("/auth/change-password",formData);
                        const data=response.data;
    
                       
                        toast.success(data.message,{
                            position:"top-right",
                            autoClose:true
                        })
        
                        setFormData(initialFormData)
                        setFormError(initialFormError)
                        
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
                    setFormError(initialFormError)
                }
                console.log(formData);
        
            }
    return(
        <div>
            <button className="button button-block" onClick={()=>navigate(-1)}>Go back</button>
            {!auth.isVerified &&  <button className="button button-block" onClick={()=>navigate("/verify-user")}>Verify User</button>}

            <div className="form-container">
                <form className="inner-container" onSubmit={handleSubmit}>
                    <h2 className="form-title">Change Password</h2>
                    <div className="form-group">
                        <label >Old Password</label>
                        <input type="password"
                        className="form-control"
                        name="oldPassword"
                        placeholder="enter your old password"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        
                        />
                         {formError.oldPassword && <p className="error">{formError.oldPassword}</p>}
                    </div>
                    <div className="form-group">
                        <label >New Password</label>
                        <input type="password"
                        className="form-control"
                        name="newPassword"
                        placeholder="enter your new password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        
                        />
                         {formError.newPassword && <p className="error">{formError.newPassword}</p>}
                    </div>
                    <div className="form-group">
                        <input type="submit"
                        className="button"
                        value={`${loading ? "changing...":"change"}`}
                        />
                    </div>
                    
                </form>
            </div>
            
        </div>
    )

}
export default Setting;