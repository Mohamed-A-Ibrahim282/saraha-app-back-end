process.on('uncaughtException', (err) => { console.log("error in code", err) })
import express from 'express'
import { dbConnection } from './dbConnection/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import messageRouter from './src/modules/message/message.routes.js'
import { appError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import { otpVerify } from './src/modules/user/user.controller.js'

const app = express()
const port = 3000

app.use(express.json())
app.use("/users", userRouter)
app.use("/messages", messageRouter)
app.post("/verify", otpVerify)

app.use("*", (req, res, next) => {
    next(new appError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

process.on('unhandledRejection', (err) => { log("error", err) })

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server is running.`))  