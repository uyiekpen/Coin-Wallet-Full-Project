import { Response, Request } from "express";
import userModel from "../Model/userModel";
import bcrypt from "bcrypt"



const getUser = async(req: Request , res: Response) : Promise<Response>=>  {
    const UserData = await userModel.find().sort({createdAt : -1})   
    
    try {
            return res.status(200).json({
                message:"Data found",
                data: UserData
            });
        } catch (error) {
            return res.json(404).json({message : error})
        }
}

const getSingleUser = async(req: Request , res: Response) : Promise<Response>=>  {
    const UserData = await userModel.findById(req.params.id)    
    
    try {
            return res.status(200).json({
                message:"Data found",
                data: UserData
            });
        } catch (error) {
            return res.json(404).json({message : error})
        }
}

const Creatuser = async(req: Request , res: Response) : Promise<Response>=>  {
  
        const {userName ,fullname,email,password,accesstoken } = req.body
    try {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const UserData = await userModel.create({
            userName ,
            fullname,
            email,
            password :hash,  
            accessToken : 100 + Math.floor(Math.random()* 1000)
        })    
            return res.status(200).json({
                message:"Data Created",
                data:UserData
            });
        } catch (error) {
            return res.json(404).json({message : error})
        }
}

const signinUser =async (req:Request,
    res: Response
    ) : Promise<Response> => {
    try {
        const {email , password} = req.body;
        const findUser = await userModel.findOne({email})

        if (findUser) {
            const checkpassword = await bcrypt.compare(password, findUser.password)
            if (checkpassword) {
                const {...info} = findUser._doc

                return res.status(200).json({
                    message:" welcome back",
                    data : info
                })
            } else {
                return res.status(404).json({message: `password is incorrect`})
            }
        } else {
            return res.status(404).json({
                message: `user dosent exist`
            })
        }
        
    } catch (error) {
        return res.status(404).json({message:`error ${error}`})
    }
}

const updateUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { userName, fullName } = req.body;
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        { userName, fullName },
        { new: true }
      );
  
      return res.status(200).json({ message: `updated`, data: user });
    } catch (err) {
      return res.status(404).json({ message: `error ${err}` });
    }
  };



const deleteUser =async (req:Request,
    res : Response
    ): Promise<Response> => {
    try {
        const user = await userModel.findByIdAndRemove(req.params.id);
        return res.status(200).json({
            message: `deleted`
        })
    } catch (error) {
        return res.status(404).json({
            message: `error ${error}`
        })

    }
}

export {
    getUser,
    Creatuser,
    signinUser,
    updateUser,
    deleteUser,
    getSingleUser
   }
