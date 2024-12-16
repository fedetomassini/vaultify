import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongo";
import { signIn } from "@/lib/auth";

export async function POST(request: Request) {
	try {
		await connectDB();
		const { username, password } = await request.json();

		const result = await signIn("credentials", {
			username,
			password,
			redirect: false,
		});

		if (result?.error) {
			return NextResponse.json({ message: result.error }, { status: 401 });
		}

		return NextResponse.json({ message: "Signin successful" });
	} catch (error: any) {
		return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
	}
}
