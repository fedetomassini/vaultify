import { NextResponse } from "next/server";
import { UserModel } from "@/lib/db/models";
import { connectDB } from "@/lib/db/mongo";

export async function POST(request: Request) {
	try {
		await connectDB();
		const { email, password, username } = await request.json();

		const user = await UserModel.findOne({
			$or: [{ email }, { username }],
		});
		if (user) return NextResponse.json({ message: "Email or username already exists." }, { status: 409 });

		const newUser = new UserModel({
			email,
			password,
			username,
		});

		await newUser.save();

		return NextResponse.json({ message: "User created successfully." }, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ message: "Internal server error.", error: error.message }, { status: 500 });
	}
}
