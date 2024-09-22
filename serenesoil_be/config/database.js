import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const connectDB = async()=>{
try {
const connection = await mongoose.connect(process.env.MONGO_DB_URL)  
console.log("DB connected")  
return connection
} catch (error) {
    console.log("Database Connection Error")
}
}

export default connectDB