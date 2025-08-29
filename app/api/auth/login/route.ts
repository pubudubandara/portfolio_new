import connect from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export const POST = async (request : NextRequest)=>{
    try{
        const reqBody =await request.json()
        const {username,password} = reqBody;

        //check if user exists
        const user = await User.findOne({ username }).select("+password");;
        if(!user){
            return NextResponse.json({error: "User does not exist"},{status: 400})
        }

        //check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password) 
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"},{status: 400})
        }

    //Create token data
    const tokenData = {
        id: user._id,
        username: user.username,
    }

    //create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!,{expiresIn: "1d"})

    const response = NextResponse.json({
        message: "Login successful",
        success: true
    })
    response.cookies.set("token", token,{
        httpOnly: true,
    })
    return response;

    }catch(error: any){
        console.error("Login error:", error);
        return NextResponse.json({error: error.message},{status: 500})
    }
}