import mongoose from "mongoose";  
import { MONGODB_DATABASE_URI } from "../config"

export const connectMongoDB = async () => {
    try{
      mongoose.connect(MONGODB_DATABASE_URI);
      console.log("[🦊] MongoDB Atlas connected");
    }catch(err){
      console.log(err);
    }
}