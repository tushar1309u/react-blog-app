import { createContext,useState ,useEffect,useContext} from "react";
import { useNavigate,useLocation } from "react-router-dom";

export const AuthContext =createContext(null);

export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const stringifyBlogData=window.localStorage.getItem("blogData");

        if(stringifyBlogData){
            const blogData=JSON.parse(stringifyBlogData)
            const user=blogData.user;
            setAuth(user)
            
        }else{
            setAuth(null);
        }
        setIsAuthLoaded(true);

    },[navigate,location]);

    return <AuthContext.Provider value={{auth,setAuth,isAuthLoaded}}>{children}</AuthContext.Provider>

}

export const useAuth=()=>{
    const auth=useContext(AuthContext)
    return auth

}