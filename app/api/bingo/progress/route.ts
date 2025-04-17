import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/utils/db'
import UserModel from '@/utils/backend/models/user';

export async function GET(req: NextRequest) {
    //making sure user logged in
    const userId = req.nextUrl.searchParams.get('userId')
    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    //connecting to database
    await dbConnect()
    const user = await UserModel.findById(userId)
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.currentGame) {
        // If no game exists, return empty arrays but include the free box
        return NextResponse.json({
            allMarked: [12],
            completedLines: []
        })
    }

    // Get all completed lines
    const completedLines = [
        ...user.currentGame.completedRows.map((row: number) => Array.from({ length: 5 }, (_, i) => row * 5 + i)),
        ...user.currentGame.completedCols.map((col: number) => Array.from({ length: 5 }, (_, i) => col + i * 5)),
        ...user.currentGame.completedDiags.map((diag: number) => 
            diag === 0 ? [0, 6, 12, 18, 24] : [4, 8, 12, 16, 20]
        )
    ]

    // Ensure the free box (12) is always included in marked squares
    const markedSquares = new Set([...user.currentGame.marked, 12])

    return NextResponse.json({
        allMarked: Array.from(markedSquares),
        completedLines
    })
} 