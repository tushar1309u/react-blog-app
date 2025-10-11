import { Navigate,Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import { useAuth } from "../context/AuthContext";

Navigate
const PublicLayout=()=>{
    const {auth,isAuthLoaded}=useAuth();
    if(!isAuthLoaded)return null;

    if(auth){
        return <Navigate to="/" />
    }

    return(
        <>
            <PublicNavbar />
            <Outlet/>

        </>
    )

}
export default PublicLayout;