import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:{
        type: Array,
        required:  true
    },
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        default: 'Order Placed'
    },
    date:{
        type: Date,
        default: Date.now()
    },
    payment:{
        type:Boolean,
        default: false
    }
})

const Order = mongoose.models.Order || mongoose.model("Order", ordersSchema)
export default Order