
import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware" 
import multer from "multer";  
import { FolderSchema } from '../../models/folder.model';

const upload = multer(
    { 
        storage: multer.memoryStorage(), 
    }
)

const router = express.Router(); 

router.post("/new", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    let parent_folder_id = req.body.parent_folder_id
    parent_folder_id = parent_folder_id ? Object(parent_folder_id): undefined;

    try {
        
        const newFolder = await FolderSchema.create({
            foldername: req.body.folder_name, 
            parentFolderId: parent_folder_id,
            createdBy: req.user._id,    
        }) 
        
        res.status(200).send("folder created successfully.")

    } catch (error) {
        console.log(error);
        
        res.status(400).send("Failed to update file record in database");   
    } 
});

export default router;
