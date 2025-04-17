import { dbConnect } from '@/utils/db';
import UserModel from '@/utils/backend/models/user';
import { compareSync } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { email, password } = body;
    
        if (!email || !password) {
            return NextResponse.json({ message: "Please provide both email and password" }, { status: 400 })
        }
        
        await dbConnect();
        const user = await UserModel.findOne({email})
        if(!user) return NextResponse.json({ message: "User not found" }, { status: 404 })

        // compare Credentials
        const pwCompare = compareSync(password, user.password)
        if(!pwCompare) return NextResponse.json({ message: "Invalid password" }, { status: 401 })

        // sign jwt token
        const token = sign({
            email: user.email,
            name: user.name,
            _id: user._id
        }, process.env.JWT_SECRET!, {})
        
        if(!token) return NextResponse.json({ message: "Error signing token" }, { status: 500 })
            
        // set cookie
        let expireIn3Days = new Date()
        expireIn3Days.setDate(expireIn3Days.getDate() + 3)

        const response = NextResponse.json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            } 
        });

        response.cookies.set('questToken', token, { 
            httpOnly: true, 
            expires: expireIn3Days, 
            sameSite: 'lax', 
            secure: process.env.NODE_ENV === 'production' 
        });

        return response
    } catch (error){
        console.error("Login error:", error);
        return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
    }
}