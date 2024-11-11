import { env } from "@/lib/env";
import mongoose, { type ConnectOptions } from "mongoose";

const conn: boolean | any = {
	isConnected: false,
};

export async function connectDB() {
	if (conn.isConnected) return;

	const dbName = env.DB_NAME;

	const db = await mongoose.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_NETWORK}/`, {
		dbName: dbName,
	} as ConnectOptions);

	conn.isConnected = db.connections[0].readyState;
}
