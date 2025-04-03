import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware"  
import {FilesSchema} from "../../models/file.model"
import { FolderSchema } from '../../models/folder.model';

const router = express.Router(); 

router.post("/all", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    let parent_folder_id = req.body.parent_folder_id
    parent_folder_id = parent_folder_id ? Object(parent_folder_id): undefined;  

    try { 
        const allFolders = await FolderSchema.find(
            {
                createdBy: req.user._id, 
                parentFolderId: parent_folder_id, 
            }
        ); 
        res.status(200).json(allFolders);

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong, please try again later.")
    }
});

export default router;
