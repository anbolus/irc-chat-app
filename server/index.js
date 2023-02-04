const uri = "mongodb+srv://and:srSeppqO4NzTbqni@cluster0.xxl2myb.mongodb.net/test";
import express from "express";
const app = express();
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import corsOptions from "./config/cors.js";
import cors from 'cors';
const port = 5000;
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


app.use("/api/auth/", authRoutes);

/* app.post("/api/auth/login/", (req, res) => {
    res.send("ok");
}) */


app.get("/api/auth/login/", (req, res) =>{
    res.send('login');
})

app.get("/api/auth/register/", (req, res) =>{
    res.send('register');
})

const server = app.listen(5000, () => {
    console.log(`Server running on port ${port}`);
});


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`database is connected successfully`);
}).catch(err => {
    console.log(err.message);
});