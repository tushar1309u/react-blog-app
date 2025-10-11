import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify"
import { Routes,Route } from 'react-router-dom'
import Home from './pages/post/Home'
import PrivateLayout from './components/layout/PrivateLayout'
import ListCategory from './pages/category/CategoryList'
import ListPost from './pages/post/PostList'
import Profile from './pages/post/Profile'
import Setting from './pages/post/Setting'
import PublicLayout from './components/layout/PublicLayout'
import Signup from './pages/post/Signup'
import Login from './pages/post/Login'
import NewCategory from "./pages/category/NewCategory"
import UpdateCategory from "./pages/category/UpdateCategory"
import NewPost from "./pages/post/NewPost"
import DetailPost from "./pages/post/DetailPost"
import UpdatePost from "./pages/post/UpdatePost"
import VerifyUser from './pages/post/VerifyUser';
import ForgotPassword from "./pages/post/ForgotPassword"

function App() {


  return (
    <>
      <Routes>
        <Route element={<PrivateLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='categories' element={<ListCategory/>}/>
          <Route path="categories/new-category" element={<NewCategory/>}/>
          <Route path="categories/update-category/:id" element={<UpdateCategory/>}/>
          <Route path='posts' element={<ListPost/>}/>
          <Route path="posts/new-post" element={<NewPost/>}/>
          <Route path="posts/detail-post/:id" element={<DetailPost/>}/>
          <Route path="posts/update-post/:id" element={<UpdatePost/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='setting' element={<Setting/>}/>
          <Route path="verify-user" element={<VerifyUser/>}/>

        </Route>
        <Route element={<PublicLayout/>}>
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
