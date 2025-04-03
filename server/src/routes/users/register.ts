import express, { Request, Response } from 'express';
import { createHash } from "../../utils/password";
import { connectMongoDB } from "../../database/mongodb";
import { z } from "zod";
import { generateAuthToken } from "../../utils/generateJwtToken";
import { User }  from "../../models/users.model"

const router = express.Router();

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
                            .max(20, "Password must be at less then 20 characters long")});

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try { 

        const { name, 
                username, 
                email, 
                password } = registerSchema.parse(req.body);

        const hashedPassword = await createHash(password);
 
        const newUser = await User.create({ 
            name, 
            username, 
            email, 
            password: hashedPassword, 
        })

        const token = generateAuthToken(newUser.id);  
        res.status(200).send(token); 
        
    } catch (error: any) {

        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        
        if (error.code === 11000) {
            res.status(409).send("Username or email already exists, please login");
        }
        
        res.status(500).send("Failed to register user, please try again later.");
    }
});

export default router;
