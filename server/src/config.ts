import dotenv from 'dotenv';
dotenv.config();

export const JWTPRIVATEKEY: string              = process.env.JWTPRIVATEKEY || "JWTPRIVATEKEYJWTPRIVATEKEY";
export const PORT                               = process.env.PORT || 8000; 
export const MONGODB_DATABASE_URI               = process.env.MONGODB_DATABASE_URI || "NA"; 