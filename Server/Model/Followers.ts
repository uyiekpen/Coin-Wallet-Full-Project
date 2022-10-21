import mongoose from "mongoose";

type FollowerSample = {
 user : string,
}


interface newFollowerSample extends FollowerSample, mongoose.Document {

}

const FollowerSchema = new mongoose.Schema(
    {
       
         users : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "users"
        },
       
}
)

export default mongoose.model<newFollowerSample>( "followers",FollowerSchema)