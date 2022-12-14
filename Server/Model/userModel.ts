import mongoose from "mongoose";

interface DataSample {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    accessToken: number;
    Jwttoken: string;
    verified: boolean;
    verifiedToken: string;
    followers: {}[];
    following: {}[];
    wallet: {}[];
    history: {}[];
    _doc: {};
  }

interface newDataSample extends DataSample, mongoose.Document {

}

const DataSchema = new mongoose.Schema(
    {
        userName : {
            type: String
        },
        email : {
            type: String
        },
        password : {
            type: String
        },
        fullname : {
            type: String
        },
        accessToken : {
            type: Number
        },
        Jwttoken : {
            type: Number
        },
    
		verified: {
			type: Boolean,
		},
        
		verifiedToken: {
			type: String,
		},

        followers : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : "Followers"
            }
        ],
        following : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : "Followers"
            }
        ],
        wallet : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : "wallets"
            }
        ],
        history: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "histories",
            },
          ],
}, {timestamps: true}
)

export default mongoose.model<newDataSample>( "users",DataSchema)