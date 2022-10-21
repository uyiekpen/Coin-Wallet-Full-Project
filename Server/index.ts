import express, { application, Application } from "express"
import cors from "cors"
import mongoose from "mongoose"
import api from "./Router/userRouter"
import follows from "./Router/followRouter"
import wallets from "./Router/walletRouter"
import history from "./Router/historyRouter"

const Port : Number =  3900

const url = `mongodb://localhost/SampleDB`

mongoose.connect(url)
.then((): void =>{
    console.log(`database is ready`)
})
.catch((err) =>{
    console.log(err)
})

const server: Application = express()


server.use(express.json())
server.use(cors())
server.use("/api/vi", api)
server.use("/api/follow", follows)
server.use("/api/wallet", wallets)
server.use("/api/history", history)





server.listen(Port , () : void =>{
    console.log(`server is listening to port ${Port}`)
})