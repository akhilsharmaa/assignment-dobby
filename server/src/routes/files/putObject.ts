
import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware"
import multer from "multer";  
import { PutObjectCommand , GetObjectCommand } from "@aws-sdk/client-s3";  
import { upload } from "../../utils/savePdfToDisk" 
const router = express.Router(); 

router.post("/new", upload.single('file'), authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  

    if(!req.file){
        res.status(401).send("No file found!, Please select a file")
        return; 
    }  

    try {
        
    } catch (error) {
        res.status(400).send("Failed to update file record in database");   
    } 
});

export default router;
