import { Request, Response } from "express";
import userModel from "../Model/userModel";
import Following from "../Model/Following";
import Followers from "../Model/Followers";
import bcrypt from "bcrypt"
import crypto from "crypto"

export const follow =async (
    req:Request,
    res: Response
    ) : Promise<Response> => {
    try {
        await userModel.findByIdAndUpdate(
            req.params.followingID,
            {
                $push: {following: req.params.followerID}
            },
            {new: true}
            );

            await userModel.findByIdAndUpdate(
                req.params.followerID,
                {
                    $push: {followers: req.params.followingID}
                },
                {new: true}
            )

       return res.status(200).json({
        message: `started following`
       }) 
    } catch (error) {
        return res.status(404).json({
            message :`error ${error}`
        })
        
    }
}

export const unfollow =async (
    req:Request,
    res: Response
    ) => {
    try {
       await userModel.findByIdAndUpdate(
        req.params.followerID,
        {
            $pull: {following : req.params.followingID}
        },
        {new : true}
        )

        await userModel.findByIdAndUpdate(
            req.params.followerID,
            {
                $pull: {followers : req.params.followingID}
            },
            {new : true}
            )

    } catch (error) {
       return res.status(404).json({
        message : `err ${error}`
       })    
    }
}