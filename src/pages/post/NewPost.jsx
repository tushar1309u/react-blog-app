import { useState, useEffect, use } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import addPostValidator from "../../validators/addPostValidator";
const initialFormData = {
  title: "",
  desc: "",
  category: "",
};
const initialFormError = {
  title: "",
  category: "",
};
const NewPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    const getCategories = async () => {
      try {
        //api request
        const response = await axios.get(`/category?size=1000`);
        const data = response.data.data;
        setCategories(data.categories);
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addPostValidator({
      title: formData.title,
      category: formData.category,
    });
    if (errors.title || errors.category) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        let input = formData;

        if (fileId) {
          input = { ...input, file: fileId };
        }
        //api request

        const response = await axios.post("/posts", input);
        const data = response.data;

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);

        setLoading(false);
        navigate("/posts");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };
  const handleFileChange = async (e) => {
    console.log(e.target.files);

    const formInput = new FormData();
    formInput.append("image", e.target.files[0]);

    const type = e.target.files[0].type;

    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setExtensionError(null);
      try {
        setIsDisable(true);
        //api request

        const response = await axios.post("/file/upload", formInput);
        const data = response.data;
        setFileId(data.data._id);

        console.log(data);

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setIsDisable(false);
      } catch (error) {
        setLoading(false);
        setIsDisable(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setExtensionError("only .png or .jpg or .jpeg allowed");
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              name="desc"
              placeholder="lorem posum"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Select an image</label>
            <input
              type="file"
              className="form-control"
              name="file"
              placeholder="lorem ipsum"
              onChange={handleFileChange}
            />
            {extensionError && <p className="error">{extensionError}</p>}
          </div>
          <div className="form-group">
            <label>Select a category</label>
            <select
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formError.category && (
              <p className="error">{formError.category}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="button"
              value={`${loading ? "adding..." : "add"}`}
              disabled={isDisable}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewPost;
