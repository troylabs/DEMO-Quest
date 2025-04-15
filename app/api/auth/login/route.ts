import { dbConnect } from '@/utils/db';
import UserModel from '@/utils/backend/user';
import { compareSync } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { email, password } = body;
    
        if (!email || !password) {
            return Response.json({ message: "Please provide both email and password" }, { status: 400 })
        }
        await dbConnect();
        const user = await UserModel.findOne({email})
        if(!user) return Response.json({ message: "User not found" }, { status: 404 })

        // compare Credentials
        const pwCompare = compareSync(password, user.password)
        if(!pwCompare) return Response.json({ message: "Invalid password" }, { status: 401 })

        const response = NextResponse.json({ user: user });

        // sign jwt token
        const token = sign({
            email: user.email,
            name: user.name,
            _id: user._id
        }, process.env.JWT_SECRET!, {})
        if(!token) return Response.json({ message: "Error signing token" }, { status: 500 })
            
        // set cookie
        let expireIn3Days = new Date()
        expireIn3Days.setDate(expireIn3Days.getDate() + 3)

        response.cookies.set('questToken', token, { httpOnly: true, expires: expireIn3Days, sameSite: 'none', secure: true });

        return response
    } catch (error){
        return Response.json({ error: "an error has occurred" }, { status: 500 })
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         const { email, password } = await req.json()

//         if (!email || !password) {
//             return Response.json({ message: "Please provide both username and password" }, { status: 400 })
//         }

//         await dbConnect()
//         const user = await UserModel.findOne({email})
        
//         if (error || !data.length) {
//             console.log('error:', error);
//             return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//         }

//         const pwCompare = compareSync(password, data[0]?.password)
//         if(!pwCompare) return Response.json({ message: "Invalid credentials" }, { status: 401 })        
            
//         // sign jwt token
//         const token = sign({
//             email: data[0].email,
//             id: data[0].id,
//             display_name: data[0].display_name,
//         }, process.env.JWT_SECRET!, {})
//         if(!token) return Response.json({ message: "Error signing token" }, { status: 500 })
            
//         // set cookie
//         const expireIn7Days = new Date()
//         expireIn7Days.setDate(expireIn7Days.getDate() + 7)

//         const response = NextResponse.json({ 
//             success: true,
//             user: data[0].display_name,
//         }, { 
//             status: 200
//         });

//         response.cookies.set('tradesc-token', token, { httpOnly: true, expires: expireIn7Days, sameSite: 'none', secure: true });
        
//         return response
//     } catch (error) {
//         console.log('error:', error);
//         return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//     }
// }%