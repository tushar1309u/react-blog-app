
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
const ListPost=()=>{
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState([]);
    const[searchValue,setSearchValue]=useState("")
    const [size, setSize] = useState(10);
    const [posts,setPosts]=useState([]);

    
      useEffect(() => {
        const getPosts = async () => {
          try {
            setLoading(true);
            //api request
            const response = await axios.get(
              `/posts?page=${currentPage}&size=${size}&q=${searchValue}`
            );
            const data = response.data.data;
            setPosts(data.posts);
            setTotalPage(data.pages);

            console.log(data);

            setLoading(false);
          } catch (error) {
            setLoading(false);
            const response = error.response;
            const data = response.data;
            toast.error(data.message, {
              position: "top-right",
              autoClose: true,
            });
          }
        };
        getPosts();
      }, [currentPage, size]);

      useEffect(() => {
          if (totalPage > 1) {
            let tempPageCount = [];
            for (let i = 1; i <= totalPage; i++) {
              tempPageCount = [...tempPageCount, i];
            }
            setPageCount(tempPageCount);
          } else {
            setPageCount([]);
          }
        }, [totalPage]);
        const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch=async(e)=>{
      try {
          const input=e.target.value;
          setSearchValue(input)
  
          const response=await axios.get(`/posts?q=${input}&page=${currentPage}&size=${size}`)
          const data=response.data.data;
          setPosts(data.posts);
          setTotalPage(data.pages)
      } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: true,
          });
      }
  
    }

    return(
        <div>
            <button className="button button-block" onClick={()=>navigate("new-post")}>Add New Post</button>
            <h2 className="table-title">Post List</h2>

            <input type="text"
            className="search-input"
            name="search"
            placeholder="Search here"
            onChange={handleSearch}
            />
            <div className="flexbox-container wrap" >
                {loading ? "Loading..." : (posts.map((post)=> <div className="post-card" key={post._id} onClick={()=>navigate(`detail-post/${post._id}`)}>
                    <h4 className="card-title">{post.title}</h4>
                    <p className="card-desc">
                        {post.desc.substring(0,50)}
                    </p>
                    
                </div>))}
                
                
            </div>
             {pageCount.length > 0 && (
        <div className="page-container">
          <button
            className="page-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            prev
          </button>
          {pageCount.map((pageNumber, index) => (
            <button
              className="page-button"
              key={index}
              onClick={() => handlePage(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? "#ccc" : "",
              }}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="page-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            next
          </button>
        </div>
      )}
            <div>
        <label>Items per page: </label>
        <select
          value={size}
          onChange={(e) => {
            setSize(parseInt(e.target.value));
            setCurrentPage(1); // reset to first page
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
        </div>
    )
}
export default ListPost;
