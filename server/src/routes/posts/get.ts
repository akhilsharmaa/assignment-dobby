import express, { Request, Response } from 'express';
import { Router } from 'express';  

const router: Router = express.Router(); 

router.get('/posts', async (req:Request, res:Response) => {
    
    res.status(200).json({
        message: "Successfully edited the category.",
    });
}); 

export default router;