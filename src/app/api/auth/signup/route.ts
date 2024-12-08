import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/User";
import bcryptjs from 'bcryptjs';


export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {name, email, password} = reqBody;

        console.log(reqBody);

        await connect();
        
        //Check if user already exists
        const existingUser = await User.findOne({ email: email})

        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        //Hash Password with salt rounds of 10
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role:"USER"
        });

        const savedUser = await user.save();
        console.log("User Saved Successfully");
        console.log(savedUser);

        return NextResponse.json(
            {
                message: "User Saved Successfully",
                success: true,
                user: savedUser
            },
            {
                status: 201
            }
        );

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