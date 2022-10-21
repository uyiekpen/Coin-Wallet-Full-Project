import mongoose from "mongoose";

interface User {
    wallet: {};
  amount: number;
  sentTo?: string;
  receivedFrom?: string;
  transactionDescription?: string;
}

interface iUser extends User , mongoose.Document{
}

const historyModel = new mongoose.Schema({
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wallets"
    },

    amount: {
        type: Number
    },
    sentTo : {
        type: String
    },
    receivedFrom : {
        type: String
    },

    transactionDescription : {
        type: String
    }
}, {timestamps: true})

export default mongoose.model<iUser>("histories", historyModel)