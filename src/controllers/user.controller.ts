import {NextFunction, Request, RequestHandler, Response } from "express"
import User from "../models/user.models"
import customError from "../middlewares/error-handler.middleware"
import { asyncHandler } from "../utils/async-handler.utils"



//get all user

export const getAllUser = asyncHandler(
    async(req:Request, res: Response, next:NextFunction)=> {
   
        const users:any = await User.find().select("-password")

        res.status(200).json({
            message:'All users fetched',
            status:'success',
            success:true,
            data:users
        })

})


//get by id

export const getById = asyncHandler(async(req:Request, res:Response, next:NextFunction) =>{
const {userId} = req.params
        
        const user:any = await User.findById(userId).select("-password")
        if(!user){
            throw new customError("user not found",404)
        }
        res.status(200).json({
            message:`user fetched`,
            status:"success",
            success:true,
            data:user
        })

})


//update profile
export const updateProfile =asyncHandler(  async(req:Request, res:Response, next:NextFunction) =>{
      const {firstName,lastName,phone,gender} = req.body
      const {userId} = req.params
      const user = await User.findById(userId)

      if(!user){
            throw new customError("user not found",404);
        }
    
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(phone) user.phone = phone
    if(gender) user.gender = gender
    
    await user.save()

    // OR findByIdAndUpdate ({id},{firstName,lastName,phone,gender},{new:true})

    res.status(200).json({
        message:`profile updated successully`,
        success: true,
        status:'success',
        data:user
    })
  
})


//delete user

export const deleteUser = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
        const {userId} = req.params
         const deleteUser = await User.findByIdAndDelete(userId)

      if(!deleteUser){
            throw new customError("user not found",404);
        }
    
    
    res.status(200).json({
        message:`user deleted sucessfully`,
        success:true,
        status:'success',
        data:null
    })

})
