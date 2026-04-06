import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"
import databaseConnection from "./config/database.js"
import { app, server } from "./socket/socket.js"  // ✅ yahan se import
import path from "path"

dotenv.config({ path: ".env" })

const _dirname = path.resolve();

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://chat-app-deploy-9wkt.onrender.com",
    credentials: true
}))

// routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/message", messageRoute)

databaseConnection()

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})