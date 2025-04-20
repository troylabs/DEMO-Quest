import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: "Logged out successfully" });
    
    // Clear the auth cookie
    response.cookies.set('questToken', '', { 
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });
    
    return response;
} 