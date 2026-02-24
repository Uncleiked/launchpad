import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth"
import ideasRoutes from "./routes/ideas"
import categoriesRoutes from "./routes/categories"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/ideas", ideasRoutes)
app.use("/api/categories", categoriesRoutes)

app.get("/", (req, res) => {
    res.send("Launchpad API is running!")
})

app.listen(port, () => {
    console.log(`Server is running accurately on port ${port}`)
})
