import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware"  
import {FilesSchema} from "../../models/file.model"

const router = express.Router(); 

interface FileRespose {
    _id : Object, 
    parentFolderId: String | undefined | null, 
    filename: String, 
    contentType: String, 
    createdBy: String, 
    uploadedAt: Date, 
}

router.post("/search", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    try {  

        
        let search_input = req.body.search_input   

        const allFiles = await FilesSchema.find(
            {   
                createdBy: Object(req.user._id), 
                filename: { $regex: '.*' + search_input + '.*' }
            }
        ); 

        const files: FileRespose[] = []; 

        allFiles.forEach((file) => {
            files.push({ 
                _id : file._id, 
                parentFolderId: file.parentFolderId, 
                filename: file.filename, 
                contentType: file.contentType,  
                createdBy: file.createdBy, 
                uploadedAt: file.uploadedAt,                 
            })
        }) 
        
        res.status(200).json(files);

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong, please try again later." )
    }
});

export default router;
