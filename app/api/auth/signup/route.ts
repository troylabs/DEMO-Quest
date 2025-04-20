import { dbConnect } from "@/utils/db";
import UserModel from '@/utils/backend/models/user';
import { hashSync, genSaltSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { email, password, name } = body;
    
        if (!email || !password || !name) {
            return Response.json({ message: "Please provide all informations" }, { status: 400 })
        }

        await dbConnect();
        const hashedPassword = hashSync(password, genSaltSync(10))
        const newUser = await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
        })

        const response = NextResponse.json({ user: newUser });
        
        // sign jwt token
        const token = sign({
            email: newUser.email,
            name: newUser.name,
            _id: newUser._id
        }, process.env.JWT_SECRET!, {})
        if(!token) return Response.json({ message: "Error signing token" }, { status: 500 })
        
        // set cookie
        let expireIn3Days = new Date()
        expireIn3Days.setDate(expireIn3Days.getDate() + 3)
        response.cookies.set('questToken', token, { 
            httpOnly: true, 
            expires: expireIn3Days, 
            sameSite: 'lax', 
            secure: process.env.NODE_ENV === 'production' 
        });
        
        return response
    } catch (error){
        console.error("Error signing up", error)
        return Response.json({ error: "an error has occurred" }, { status: 500 })
    }
}