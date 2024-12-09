import {NextResponse} from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: `Successfully logged out`,
            success: true,
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        else {
            return NextResponse.json({ error: String(error) }, { status: 500 });
        }
    }
}