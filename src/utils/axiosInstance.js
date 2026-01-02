import axios from "axios";
const axiosInstance=axios.create({baseURL:"https://blog-backend-api-3.onrender.com/api/v1"})
axiosInstance.interceptors.request.use((req)=>{
    const stringifyBlogData=window.localStorage.getItem("blogData");

    if(stringifyBlogData){
        const blogData=JSON.parse(stringifyBlogData);
        const token=blogData.token;

        req.headers.Authorization=`Bearer ${token}`;
    }
    return req;
});


export default axiosInstance;
