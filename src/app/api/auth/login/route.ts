import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/User"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST (req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        await connect();

        //Check if the user exists
        console.log("Checking if user exists")
        const existingUser = await User.findOne({ email: email}).select("+password");
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        //Check if the password is correct
        const validPassword = await bcryptjs.compare(password, existingUser.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        //Create token data
        const tokenData = {
            id: existingUser._id,
            name:  existingUser.name,
            email: existingUser.email
        }

        //create token
        const token = jwt.sign(tokenData, process.env.NEXTAUTH_SECRET!, {expiresIn: "10d"});

        const response: NextResponse<{
            message: string;
            success: boolean;
        }> = NextResponse.json({
            message: "Authenticated successfully",
            success: true,
        })

        response.cookies.set("token", token, { httpOnly: true });

        return response;

    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        else {
            return NextResponse.json({ error: String(error) }, {status: 500});
        }
    }
}