import { cookies } from 'next/headers'
import { dbConnect } from '@/utils/db'
import UserModel from '@/utils/backend/user';
import { verify } from 'jsonwebtoken'

export async function GET(req: Request) {
    try{
        const cookieStore = await cookies()
        const token = cookieStore.get('questToken')
        
        if(!token) return Response.json({ message: "No token found" }, { status: 400 })
            
        await dbConnect()
        const decoded:any = verify(token.value, process.env.JWT_SECRET!)
        if(!decoded) return Response.json({ message: "Invalid token" }, { status: 400 })

        // find user
        const user = await UserModel.findById(decoded._id)
        if(!user) return Response.json({ message: "User not found" }, { status: 404 })
        return Response.json({ user })
    } catch (error){
        return Response.json({ error: "an error has occurred" }, { status: 500 })
    }
}