import { Response, Request } from "express";
import userModel from "../Model/userModel";
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import path from "path"
import ejs from "ejs"
import nodemailer from "nodemailer"


const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port : 465,
    secure: true,
    auth: {
        user : "uyiekpenelizabeth@gmail.com",
        pass: "aegfyzzmqeqgjdwn"    
    }
})

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
  
        const {userName ,fullname,email,password } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
       const token = crypto.randomBytes(5).toString("hex")
       const data = jwt.sign({token}, "MySecret")

        const UserData = await userModel.create({
            userName ,
            fullname,
            email,
            password :hash,  
            Jwttoken: data,
            accessToken : 100 + Math.floor(Math.random()* 1000)
        })    

        const file = path.join(__dirname, "../views/home.ejs")

ejs.renderFile(file,(err,data)=>{
    if(err){
        console.log(err)
    }else{
        const mailOption = {
            from:"uyiekpenelizabeth@gmail.com",
            to:email,
            subject:"Account verification",
            html:data
           }

           transport.sendMail(mailOption,(err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log("mail sent",info.response)
            }
           })
    }
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

const changePassword = async (
    req : Request, 
    res: Response): Promise<Response> => {
	try {
		const { password } = req.body;
		const user = await userModel.findById(req.params.id);
		if (user) {
			if (user.verified && user.Jwttoken === req.params.token) {
				const salt = await bcrypt.genSalt(10);
				const hashed = await bcrypt.hash(password, salt);

				await userModel.findByIdAndUpdate(
					user._id,
					{
						token: "",
						password: hashed,
					},
					{ new: true }
				);
			}
		} else {
		    return	res.status(404).json({ message: "operation can't be done" });
		}

		 return  res.status(200).json({
			message: "password changed",
		});
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

const verifyUser =async (req:Request, res: Response) : Promise<Response> => {
    try {
        await userModel.findByIdAndUpdate({
            verified: true,
            verifiedToken: "",

        },{
            new: true
        })
        return res.status(200).json({
            message: "verification complete"
        })
    } catch (error) {
        return res.status(404).json({message: `err ${error}`})
    }
}

const resetPassword = async (req:Request,
    res: Response
    ) => {
    try {
        const email = req.body;
        const user = await userModel.findOne({email})
        if (user) {
            if(user.verified && user.Jwttoken === "")
            
        } else {
            return res.status(404).json({message: `user cant be found`})
        }
        
    } catch (error) {
        return res.status(404).json({message: `err ${error}`})
    }
}

export {
    getUser,
    Creatuser,
    signinUser,
    updateUser,
    deleteUser,
    getSingleUser,
    changePassword,
    verifyUser
   }
