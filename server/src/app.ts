import express, { Request, Response } from 'express';
import bodyParser from "body-parser" 
import cors from 'cors'; 
import morgan from "morgan"
import routes from "./routes/index" 
import {PORT} from "./config";
import {connectMongoDB } from "./database/mongodb"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

// TODO: CHANGE THE ENDPOINTS LATER
app.use(cors({
    origin: "*", 
}))

connectMongoDB(); 

app.use('', routes)
app.get('/', (req: Request, res: Response) => {
    res.send(`Welcome to dobby assignment backend.`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});