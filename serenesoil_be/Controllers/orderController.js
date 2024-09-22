import axios from 'axios';
import Order from '../models/ordersModel.js';
import User from '../models/userModal.js'

export const placeOrder = async (req, res) => {
    const { total, currency, receipt } = req.body;

    try {
        // Ensure amount is in the smallest currency unit (paise for INR)
        const payload = {
            amount: total * 100, // Convert to paise
            currency: currency,
            receipt: receipt,
        };

        // Authentication details
        const auth = {
            username: "rzp_test_Ex5SxT8OQlIlrc", // Replace with your API key
            password: "TkKZPH8Xh9GLtXI9zpUuWRVV", // Replace with your API secret
        };

        // Making the POST request to Razorpay API
        const response = await axios.post(
            "https://api.razorpay.com/v1/orders",
            payload,
            {
                auth: auth,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Log the response for debugging
        console.log('Order created:', response.data);

        // Send the response back to the client
        res.status(200).json(response.data);
        
    } catch (error) {
        // Enhanced error logging
        console.error('Error response:', error.response?.data || error.message);
        
        // Send a structured error response
        res.status(400).json({
            message: "Error placing the order",
            error: error.response?.data || error.message
        });
    }
};


export const createOrder = async(req,res)=>{
    const {userID, items, amount, address, payment} = req.body

    // validate
    const existingUser = await User.findById(userID)
    if(!existingUser){
        return res.status(404).json({message:"Invalid User Data"})
    }
    try {
        const newOrder = new Order({
            userID: userID,
            items: items,
            amount: Number(amount),
            address: address,
            payment: payment
        })
        await newOrder.save()
        await User.findByIdAndUpdate(userID,{$set:{cartData:{}}})
        res.status(200).json({message:"Order Created"})
    } catch (error) {
        res.status(500).json({message:"Internal server error in creating order"})
    }
}

export const fetchOrder = async(req,res)=>{
    const {userID} = req.body
    // validate
    const existingUser = await User.findById(userID)
    if(!existingUser){
        return res.status(404).json({message:"User not found"})
    }
    try {
        const orders = await Order.find({userID: userID})
        console.log(orders)
        res.status(200).json({orders: orders})
    } catch (error) {
        res.status(500).json({message:"Internal server error in fetching user order"})
    }
}

export const fetchAllOrder = async (req,res)=>{
    try {
        const orders = await Order.find({})
        res.status(200).json({allOrders: orders})
    } catch (error) {
        res.status(500).json({message:"Internal server error in fetching all Orders"})
    }
}

export const statusChange = async (req,res)=>{
    const {status, orderID} = req.body
    // validation
    const existingOrder = await Order.findById(orderID)
    if(!existingOrder){
        return res.status(404).json({message:"No order found"})
    }
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderID,{$set:{status:status}},{new:true})
        res.status(200).json({message:'Order Updated', orderData:updatedOrder})
    } catch (error) {
        res.status(500).json({message:"Internal server error in changing Status"})
    }
}