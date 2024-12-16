import { NextResponse } from "next/server";

export async function GET() {
	const response = NextResponse.json({ message: "Logout successful" });
	return response;
}
