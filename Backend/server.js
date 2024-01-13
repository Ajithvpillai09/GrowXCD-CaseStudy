import express from "express";
import dotenv from "dotenv";
import path from "path"
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import router from "./routes/router.js";



dotenv.config()

const __dirname = path.resolve();

const app = express();
const server = createServer(app)


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use('/api',router)


if(process.env.NODE_ENV === "development"){
   app.get('/',(req,res)=>{
    res.send("server running....port 8080")
   })
}else{
    app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, './frontend/javaScript', 'index.html'))
);
}


app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT


server.listen(PORT,()=>console.log(`server listening to localhost:${PORT} `))      