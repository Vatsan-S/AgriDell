import React, { useEffect, useState } from "react";
import { MdUploadFile, MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import API_URL from "../../../serenesoil_fe/src/Config/api_url.js";
import { useNavigate } from "react-router-dom";

const Products = () => {
  // ----------------states-----------------------


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productID, setProductID] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [image, setImage] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "oil",
    stock: 0,
  });
  const [list, setList] = useState([]);
const navigate = useNavigate()
useEffect(()=>{
  const token = localStorage.getItem('adminToken')
  if(!token){
    navigate('/')
  }
},[])
  // ------------------------------fetch Data---------------------------
  const fetchList = async () => {
    const response = await axios.get(`${API_URL}/api/product/list`);
    try {
      // console.log(response);
      setList(response.data.list);
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching List");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // -------------------------------delete Product----------------------
  const deletProduct = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/product/deleteProduct`, {
        productID: id,
      });
      // console.log(response.data.message);
      toast.success("Product Removed");
      fetchList();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // --------------------------------openEditProduct----------------------------------
  const openEditProduct = (ele) => {
    setFormData({
      name: ele.name,
      description: ele.description,
      price: ele.price,
      category: ele.category,
      stock: ele.stock,
    });
    setProductID(ele._id);
    setEditImage(ele.image);
    setEditModalIsOpen(true);
  };
  // -----------------------------edit Product----------------------------------------
  const onEditHandler = async (e) => {
    e.preventDefault();
    // console.log("Formdata", formData);
    let img;
    if (typeof editImage === "object") {
      // console.log("Working");
      img = await uploadFiles(editImage);
    } else {
      img = editImage;
    }
    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
      image: img,
      productID: productID,
    };

    try {
      const response = await axios.post(
        `${url}/api/product/editProduct`,
        payload
      );
      // console.log(response);
      fetchList();
      toast.success("Product Edited");
      setEditModalIsOpen(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "oil",
        stock: 0,
      });
      setEditImage(false);
    } catch (error) {
      console.log(error);
      toast.error("Error editing Product");
    }
    // console.log(typeof payload.image);
  };
  // ----------------------------onchange Handler------------------------------------
  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };



  // ---------------------------add Product button Click---------------------------------
  const handleAddProduct = () => {
    setEditModalIsOpen(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "oil",
      stock: 0,
    });
    setModalIsOpen(true);
  };
  // ---------------------------upload function----------------
  const uploadFiles = async (file) => {
    console.log(file);
    try {
      const payload = new FormData();
      payload.append("file", file);
      payload.append("upload_preset", "images_preset");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddycjnke1/image/upload",
        payload
      );
      const { secure_url } = response.data;
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };
  // --------------------------on submit-----------------------
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("working");
    const img = await uploadFiles(image);

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
      image: img,
    };
    try {
      // console.log(formData);
      const response = await axios.post(
        `${API_URL}/api/product/add`,
        payload
      );
      // console.log(response);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "oil",
        stock: 0,
      });
      setImage(false);
      toast.success(response.data.message);
      setModalIsOpen(false);
      fetchList();
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };
  // ========================================================jsx=======================================
  return (
    <div className="productsPage">
      <div className="productsMenubar">
        <button className="addProduct" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
      {modalIsOpen && (
        <div className="createModal">
          <div className="modalContent">
            <form className="form flex-col" onSubmit={onSubmitHandler}>
              <h3>Add Product</h3>
              <div className="imageUpload inputGroup">
                <p>Upload Image</p>
                <label htmlFor="image1" className="image1">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Image"
                    />
                  ) : (
                    <div className="uploadIcon">
                      <MdUploadFile />
                    </div>
                  )}
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image1"
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="productTitle inputGroup">
                <label htmlFor="title">Product Title</label>
                <input
                  onChange={onchangeHandler}
                  value={formData.name}
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="productDescription inputGroup">
                <label htmlFor="description">Product Description</label>
                <textarea
                  onChange={onchangeHandler}
                  value={formData.description}
                  name="description"
                  id="description"
                  rows="6"
                  placeholder="describe your product"
                ></textarea>
              </div>
              <div className="addCategoryAndPrice flex-col">
                <div className="addCategory inputGroup">
                  <label htmlFor="category"> category</label>
                  <select
                    name="category"
                    onChange={onchangeHandler}
                    id="category"
                  >
                    <option value="oil">oil</option>
                    <option value="spice">spice</option>
                    <option value="utilities">Utilities</option>
                    <option value="cooking">Cooking</option>
                    <option value="devotional">Devotional</option>
                    <option value="cosmetics">Cosmetics</option>
                  </select>
                </div>
                <div className="addPrice inputGroup">
                  <label htmlFor="productPrice">Product Price Rs.</label>
                  <input
                    onChange={onchangeHandler}
                    value={formData.price}
                    type="Number"
                    name="price"
                    id="productPrice"
                    placeholder="500"
                  />
                </div>
              </div>
              <div className="stock inputGroup">
                <label htmlFor="stock">Stock</label>
                <input
                  onChange={onchangeHandler}
                  value={formData.stock}
                  type="Number"
                  id="stock"
                  name="stock"
                  placeholder="Available Stock"
                />
              </div>
              <button type="submit" className="addButton">
                Add Product
              </button>
            </form>
          </div>
          <div
            className="modalBackground"
            onClick={() => setModalIsOpen(false)}
          ></div>
        </div>
      )}
      {editModalIsOpen && (
        <div className="createModal">
          <div className="modalContent">
            <form className="form flex-col" onSubmit={onEditHandler}>
              <h3>Edit Product</h3>
              <div className="imageUpload inputGroup">
                <p>Click image to reUpload</p>
                <label htmlFor="image1" className="image1">
                  {editImage ? (
                    <img
                      src={
                        typeof editImage === "string"
                          ? editImage
                          : URL.createObjectURL(editImage)
                      }
                      alt="Uploaded Image"
                    />
                  ) : (
                    <div className="uploadIcon">
                      <MdUploadFile />
                    </div>
                  )}
                  <input
                    onChange={(e) => setEditImage(e.target.files[0])}
                    type="file"
                    id="image1"
                    hidden
                  />
                </label>
              </div>
              <div className="productTitle inputGroup">
                <label htmlFor="title">Product Title</label>
                <input
                  onChange={onchangeHandler}
                  value={formData.name}
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="productDescription inputGroup">
                <label htmlFor="description">Product Description</label>
                <textarea
                  onChange={onchangeHandler}
                  value={formData.description}
                  name="description"
                  id="description"
                  rows="6"
                  placeholder="describe your product"
                ></textarea>
              </div>
              <div className="addCategoryAndPrice flex-col">
                <div className="addCategory inputGroup">
                  <label htmlFor="category"> category</label>
                  <select
                    name="category"
                    onChange={onchangeHandler}
                    value={formData.category}
                    id="category"
                  >
                    <option value="oil">oil</option>
                    <option value="Beauty Care">Beauty Care</option>
                    <option value="FoodGrains & Oil">FoodGrains & Oil</option>
                  </select>
                </div>
                <div className="addPrice inputGroup">
                  <label htmlFor="productPrice">Product Price Rs.</label>
                  <input
                    onChange={onchangeHandler}
                    value={formData.price}
                    type="Number"
                    name="price"
                    id="productPrice"
                    placeholder="500"
                  />
                </div>
              </div>
              <div className="stock inputGroup">
                <label htmlFor="stock">Stock</label>
                <input
                  onChange={onchangeHandler}
                  value={formData.stock}
                  type="Number"
                  id="stock"
                  name="stock"
                  placeholder="Available Stock"
                />
              </div>
              <button type="submit" className="addButton">
                Edit Product
              </button>
            </form>
          </div>
          <div
            className="modalBackground"
            onClick={() => setEditModalIsOpen(false)}
          ></div>
        </div>
      )}
      <hr />
      <div className="list flex-col">
        <h3>All Products</h3>
        <div className="listTable">
          <div className="listTableFormat tableHead">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Description</b>
            <b>Price</b>
            <b>Stock</b>
            <b>Actions</b>
          </div>
          {list.map((ele, index) => {
            return (
              <div className="listTableFormat" key={index}>
                <img src={ele.image} alt={`Product image of ${ele.name}`} />
                <p><strong>{ele.name}</strong></p>
                <p>{ele.category}</p>
                <p>{ele.description}</p>
                <p>Rs.{ele.price}</p>
                <p>Qty.{ele.stock}</p>
                <div className="actions">
                  <p className="cursor" onClick={() => deletProduct(ele._id)}>
                    {<MdDelete />}
                  </p>
                  <p className="cursor" onClick={() => openEditProduct(ele)}>
                    {<MdEdit />}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
