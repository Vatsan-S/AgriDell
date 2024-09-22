import User from "../models/userModal.js";
import Product from "../models/productModal.js";

export const addToCart = async (req, res) => {
  const { userID, productID } = req.body;

  try {
    // validate User
    const existingUser = await User.findById(userID);
    if (!existingUser) {
      return res.status(400).json({ message: "User unidentified" });
    }
// console.log(existingUser)
    // validate Product
    const existingProduct = await Product.findById(productID);
    if (!existingProduct) {
      return res.status(400).json({ message: "Product unidentified" });
    }

    // add to cart
    let cartItems = existingUser.cartData
    // console.log(cartItems)
    if (!cartItems[productID]) {
      cartItems[productID] = 1;
    } else {
      // console.log("working")
      cartItems[productID] += 1;
    }

    const updatedUser = await User.findByIdAndUpdate(userID,{$set:{cartData:cartItems}});
    const findUser = await User.findById(userID)
    console.log(findUser)
    res
      .status(200)
      .json({ message: "Added to cart", cartData: existingUser.cartData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error in add to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userID, productID } = req.body;
  try {
    // validate User
    const existingUser = await User.findById(userID);
    if (!existingUser) {
      return res.status(400).json({ message: "User unidentified" });
    }

    // validate Product
    const existingProduct = await Product.findById(productID);
    if (!existingProduct) {
      return res.status(400).json({ message: "Product unidentified" });
    }

    // remove from cart
    // if (existingUser.cartData[productID]) {
    //   existingUser.cartData[productID] -= 1;
    //   if (existingUser.cartData[productID] <= 0) {
    //     delete existingUser.cartData[productID];
    //   }
    // }

    // await existingUser.save();
      // add to cart
      let cartItems = existingUser.cartData
      // console.log(cartItems)
      if (cartItems[productID] <= 1) {
       delete cartItems[productID] 
      } else {
        // console.log("working")
        cartItems[productID] -= 1;
      }

      console.log(cartItems)
    const updatedUser = await User.findByIdAndUpdate(userID, {$set:{cartData:cartItems}},{new:true})
    console.log(updatedUser)
    res
      .status(200)
      .json({
        message: "Item removed by one",
        cartData: existingUser.cartData,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error in removing from cart" });
  }
};


export const deleteProduct = async(req,res)=>{
    const {userID, productID}= req.body
    try {
         // validate User
    const existingUser = await User.findById(userID);
    if (!existingUser) {
      return res.status(400).json({ message: "User unidentified" });
    }

    // validate Product
    const existingProduct = await Product.findById(productID);
    if (!existingProduct) {
      return res.status(400).json({ message: "Product unidentified" });
    }
    // delete from cart
    let cartItems = existingUser.cartData
    console.log(delete cartItems[productID])
    console.log(cartItems)
    const updatedUser = await User.findByIdAndUpdate(userID,{$set:{cartData:cartItems}},{new:true})
    res.status(200).json({message:"Product removed from cart", cartData:updatedUser.cartData})

    } catch (error) {
        res.status(500).json({message:"Internal server error in deleting product"})
    }
}