
import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware" 
import multer from "multer"; 
import {FilesSchema} from "../../models/file.model"

const upload = multer(
    { 
        storage: multer.memoryStorage(), 
    }
)

const router = express.Router(); 

router.post("/new", upload.single('file'), authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  

    if(!req.file){
        res.status(401).send("No file found!, Please select a file")
        return; 
    }

    try {

        const newfile = await FilesSchema.create({
            parentFolderId: req.body.parent_folder_id,
            createdBy: req.user._id, 
            filename: req.file.originalname, 
            contentType: req.file.mimetype, 
            data: req.file.buffer,  
        })

        res.status(200).send("File uploaded successfully.") 
        
    } catch (error) {
        res.status(400).send("Failed to update file record in database");   
    } 
});

export default router;
