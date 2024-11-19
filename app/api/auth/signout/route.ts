import { NextResponse } from "next/server";

export async function GET() {
	const response = NextResponse.json({ message: "Logout successful" });
	response.cookies.set("v_token", "", {
		httpOnly: true,
		maxAge: 0,
		path: "/",
	});
	return response;
}
