import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment";
import {Modal,Button} from "react-bootstrap";
const ListCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [size, setSize] = useState(10);
  const[searchValue,setSearchValue]=useState("")
  const[showModal,setShowModal]=useState(false)
  const [categoryId,setCategoryId]=useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        //api request
        const response = await axios.get(
          `/category?page=${currentPage}&size=${size}&q=${searchValue}`
        );
        const data = response.data.data;
        setCategories(data.categories);
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
    getCategories();
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

        const response=await axios.get(`/category?q=${input}&page=${currentPage}&size=${size}`)
        const data=response.data.data;
        setCategories(data.categories);
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
  const handleDelete=async()=>{
    try {
      const response=await axios.delete(`/category/${categoryId}`)
      
        const data = response.data;
        setShowModal(false);
        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        const response2 = await axios.get(
          `/category?page=${currentPage}&size=${size}&q=${searchValue}`
        );
        const data2 = response2.data.data;
        setCategories(data2.categories);
        setTotalPage(data2.pages);
    } catch (error) {
      setShowModal(false)
      const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
    }

  }

  return (
    <div>
      <button
        className="button button-block"
        onClick={() => navigate("new-category")}
      >
        Add New Category
      </button>
      <h2 className="table-title">Category List</h2>
      <input
        type="text"
        className="search-input"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      {loading ? (
        "loading..."
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.title}</td>
                <td>{category.desc}</td>
                <td>
                  {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td>
                  {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <th>
                  <button
                    className="button"
                    onClick={() => navigate(`update-category/${category._id}`)}
                  >
                    Update
                  </button>
                  <button className="button" onClick={()=>{
                    setShowModal(true);
                    setCategoryId(category._id)}}>Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
      <Modal show={showModal} onHide={()=>{setShowModal(false)
        setCategoryId(null);
      }}>
       <Modal.Header closeButton={true}>
        <Modal.Title>
          Are you sure you want to delete?
        </Modal.Title>
       </Modal.Header>
       <Modal.Footer>
        <div style={{margin:"0 auto"}}>
          <Button className="no-button" style={{backgroundColor:"grey",border:"none" ,margin:"2px 2px"}} onClick={()=>{setShowModal(false);
            setCategoryId(null)
          }}>No</Button>
          <Button className="yes-button" style={{backgroundColor:"red",border:"none",margin:"2px 2px"}} onClick={handleDelete}>Yes</Button>
        </div>
       </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ListCategory;
