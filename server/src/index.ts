import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"
import productRouter from "./routes/products"
import { errorMiddleware } from "./middlewares/error-middleware"
import categoryRouter from "./routes/categories"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", toNodeHandler(auth))
app.use("/api/products", productRouter)
app.use("/api/categories", categoryRouter)

app.use(errorMiddleware)



app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})