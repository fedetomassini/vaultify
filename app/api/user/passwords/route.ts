import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongo";
import { auth } from "@/lib/auth";
// Models \\
import { UserModel } from "@/lib/db/models";

/**
 * @function GetUserPasswords
 * @returns
 */

export async function GET(_request: Request) {
	try {
		await connectDB();

		const session = await auth();
		if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

		const user = await UserModel.findOne({ username: session.user?.name as string });

		if (!user) return NextResponse.json({ error: "User not found. :(" }, { status: 404 });

		return NextResponse.json(user.passwords, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
	}
}

/**
 * @function PostNewPassword
 * @returns
 */

export async function POST(request: Request) {
	try {
		await connectDB();

		const session = await auth();
		if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

		const body = await request.json();
		const { site, password, category } = body;

		if (!site || !category || !password)
			return NextResponse.json({ error: "Missing required fields." }, { status: 400 });

		const user = await UserModel.findOne({ username: session.user?.name as string });
		if (!user) return NextResponse.json({ error: "User not found. :(" }, { status: 404 });

		const newPassword = { site, password, category: category || "General", createdAt: new Date() };
		user.passwords.push(newPassword);
		await user.save();

		return NextResponse.json(newPassword, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
	}
}

/**
 * @function DeletePassword
 * @returns
 */

export async function DELETE(request: Request) {
	try {
		await connectDB();

		const session = await auth();
		if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

		const { searchParams } = new URL(request.url);
		const passwordId = searchParams.get("id");

		if (!passwordId) return NextResponse.json({ error: "Password ID is required." }, { status: 400 });

		const user = await UserModel.findOne({ username: session.user?.name as string });

		if (!user) return NextResponse.json({ error: "User not found. :(" }, { status: 404 });

		const index = user.passwords.findIndex((password: any) => password._id.toString() === passwordId);
		if (index === -1) return NextResponse.json({ error: "Password not found." }, { status: 404 });

		user.passwords.splice(index, 1);
		await user.save();

		return NextResponse.json({ message: "Password deleted successfully." }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
	}
}
