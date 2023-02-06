const uri = "mongodb+srv://and:srSeppqO4NzTbqni@cluster0.xxl2myb.mongodb.net/test";
import express from "express";
const app = express();
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import http from "http";
import cors from 'cors';
import { Server } from "socket.io";
const port = 5000;
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.use("/api/auth/", authRoutes);

/* app.post("/api/auth/login/", (req, res) => {
    res.send("ok");
}) */

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected to ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id : ${socket.id} joined room ${data}`);
    })

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});


app.get("/api/auth/login/", (req, res) => {
    res.send('login');
})

app.get("/api/auth/register/", (req, res) => {
    res.send('register');
})


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})




mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`database is connected successfully`);
}).catch(err => {
    console.log(err.message);
});