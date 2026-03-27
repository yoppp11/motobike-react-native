import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"
import productRouter from "./routes/products"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", toNodeHandler(auth))
app.use("/api/products", productRouter)



app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})