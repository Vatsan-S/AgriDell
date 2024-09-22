import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = async (req, res, next) => {
  try {
    const  token  = req.header("Authorization")?.split(" ")[1];
    console.log("T");
    console.log("T", token);
    if (!token) {
      console.log(token);
      return res
        .status(404)
        .json({ message: "Not authorised login, login again" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userID = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in authentication" });
  }
};

export default authMiddleware;
