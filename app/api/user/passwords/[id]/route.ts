import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongo";
import { UserModel } from "@/lib/db/models";
import { Types } from "mongoose";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
	try {
		if (!Types.ObjectId.isValid(params.id)) {
			return NextResponse.json({ error: "ID de contraseña inválido" }, { status: 400 });
		}

		await connectDB();
		const objectId = new Types.ObjectId(params.id);
		const user = await UserModel.findOne({ "passwords._id": objectId }, { "passwords.$": 1 });

		if (!user || !user.passwords || user.passwords.length === 0) {
			return NextResponse.json({ error: "No se encontró la contraseña" }, { status: 404 });
		}

		return NextResponse.json(user.passwords[0]);
	} catch (error: any) {
		console.error("Error in GET /api/user/passwords/[id]:", error);
		return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
	}
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
	try {
		if (!Types.ObjectId.isValid(params.id)) {
			return NextResponse.json({ error: "ID de contraseña inválido" }, { status: 400 });
		}

		await connectDB();
		const objectId = new Types.ObjectId(params.id);
		const result = await UserModel.findOneAndUpdate(
			{ "passwords._id": objectId },
			{ $pull: { passwords: { _id: objectId } } },
			{ new: true },
		);

		if (!result) {
			return NextResponse.json({ error: "No se ha encontrado la contraseña" }, { status: 404 });
		}

		return NextResponse.json({ message: "Contraseña eliminada con éxito" });
	} catch (error: any) {
		console.error("Error in DELETE /api/user/passwords/[id]:", error);
		return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
	}
}
