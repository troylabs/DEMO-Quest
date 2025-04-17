import { cookies } from 'next/headers'
import { dbConnect } from '@/utils/db'
import UserModel from '@/utils/backend/models/user';
import { verify } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try{
        const cookieStore = await cookies()
        const token = cookieStore.get('questToken')
        
        if(!token) return NextResponse.json({ message: "No token found" }, { status: 400 })
            
        await dbConnect()
        const decoded:any = verify(token.value, process.env.JWT_SECRET!)
        if(!decoded) return NextResponse.json({ message: "Invalid token" }, { status: 400 })

        // find user
        const user = await UserModel.findById(decoded._id)
        if(!user) return NextResponse.json({ message: "User not found" }, { status: 404 })

        return NextResponse.json({ userId: user._id.toString() })
    } catch (error) {
        console.error('Error in /api/auth/me:', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}