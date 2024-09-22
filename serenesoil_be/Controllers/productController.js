import Product from "../models/productModal.js";
import fs from "fs";

// add product

export const addProduct = async (req, res) => {
  const { name, description, price, category, image,stock } = req.body;
  // validation
  if(!name || !description || !price || !category || !image || !stock){
    return res.status(404).json({message:"All fields are mandatory"})
  }

  // validate Unique name
  const uniqueName  = await Product.findOne({name:name})
  if(uniqueName){
    return res.status(400).json({message:"Product name already available"})
  }
  try {
    const newProduct = new Product({
      name: name,
      description: description,
      price: price,
      category: category,
      image: image,
      stock:stock
    });
    await newProduct.save();
    res.status(200).json({ message:"Product Created"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal server error in creating a product", error})
  }
};

export const listProduct = async(req,res)=>{
  try {
    const products = await Product.find()
    res.status(200).json({list:products})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal server error in listing product"})
  }
}


export const removeProduct = async (req,res)=>{
  const {productID} = req.body
  // validate
  const existingProduct = await Product.findById(productID)
  if(!existingProduct){
    return res.status(404).json({message:"No product found in this ID"})
  }
  try {
    const removingProduct = await Product.findOneAndDelete({_id:productID})
    res.status(200).json({message:"Product Removed Successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal server error in removing product"})
  }
}

export const editProduct = async(req,res)=>{
  const {productID, name,description, price, category, image, stock}= req.body
  // validation
  const existingProduct = await Product.findById(productID)
  if(!existingProduct){
    return res.status(400).json({message:"No Product Found"})
  }
  try {
    const updateProduct = await Product.findOneAndUpdate({_id:productID},{name: name,
      description: description,
      price: price,
      category: category,
      image: image,
      stock:stock},{new:true})
      console.log(updateProduct)
      res.status(200).json({message:"Product Edited Successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal server error in editing Product"})
  }
}