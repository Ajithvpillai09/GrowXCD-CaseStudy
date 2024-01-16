import express from "express";
import dotenv from "dotenv";
import path from "path"
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import router from "./routes/router.js";



dotenv.config()


const app = express();
const server = createServer(app)


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use('/api',router)


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/Frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'))
    );
    } else {
      app.get('/', (req, res) => {
        res.send('API is running....');
      });
    } 


app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT


server.listen(PORT,()=>console.log(`server listening to localhost:${PORT} `))      