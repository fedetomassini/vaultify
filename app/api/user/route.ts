import { auth } from "@/lib/auth";
// Models \\
import { UserModel } from "@/lib/db/models";
import { connectDB } from "@/lib/db/mongo";
import { NextResponse } from "next/server";

/**
 * @function GetUser
 */
export async function GET() {
	try {
		await connectDB();

		const session = await auth();
		const username = session?.user?.name as string;

		if (!username || typeof username !== "string") {
			return NextResponse.json({ error: "No active session found." }, { status: 404 });
		}

		const user = await UserModel.findOne({ username });
		if (!user) {
			return NextResponse.json({ error: "User not found." }, { status: 404 });
		}

		const userData = await UserModel.findById(user._id);

		return NextResponse.json(userData || []);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

/**
 * @function DeleteUser
 */
export async function DELETE(_request: Request) {
	try {
		await connectDB();

		const session = await auth();
		const username = session?.user?.name as string;

		if (!username || typeof username !== "string") {
			return NextResponse.json({ error: "No active session found." }, { status: 404 });
		}

		const user = await UserModel.findOne({ username });
		if (!user) {
			return NextResponse.json({ error: "User not found." }, { status: 404 });
		}

		await UserModel.deleteOne({ username });

		return NextResponse.json({ message: "Account successfully deleted." }, { status: 200 });
	} catch (error) {
		console.error("Error deleting account:", error);
		return NextResponse.json({ error: "Error deleting account." }, { status: 500 });
	}
}
