import mongoose from "mongoose";

type FollowingSample = {
 user : string,
}


interface newFollowingSample extends FollowingSample, mongoose.Document {

}

const FollowingSchema = new mongoose.Schema(
    {
       
         users : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "users"
        },
       
}
)

export default mongoose.model<newFollowingSample>( "followings",FollowingSchema)