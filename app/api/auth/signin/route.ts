import { NextResponse } from "next/server";
import { UserModel } from "@/lib/db/models";
import { connectDB } from "@/lib/db/mongo";
import { env } from "@/lib/env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
	try {
		await connectDB();
		const { username, password } = await request.json();

		const user = await UserModel.findOne({ username });

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const isPasswordValid = await bcrypt.compareSync(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const token = jwt.sign({ userId: user._id }, env.JWT_SECRET!, { expiresIn: "15m" });

		const response = NextResponse.json({ message: "Signin successful" });
		response.cookies.set("vault_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 900,
			path: "/",
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
	}
}
