import express, { Router } from 'express'; 
const router: Router = express.Router(); 

import registerUser from "./users/register"
import loginUser from "./users/login"
router.use('', [registerUser, loginUser]);

import newUpload from "./files/putFiles" 
import getUploads from "./files/getFiles" 
router.use("/files", [newUpload, getUploads]); 


import newFolder from "./folders/putFolder" 
import getFolders from "./folders/getFolders" 
router.use("/folders", [newFolder, getFolders]); 

export default router; 