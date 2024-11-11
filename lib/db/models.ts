import mongoose, { Model } from "mongoose";
import { hash, compare } from "bcryptjs";

interface IUser {
	username: string;
	password: string;
}

const UserSchema = new mongoose.Schema<IUser, UserModelType, UserMethods>({
	username: String,
	password: String,
});

UserSchema.pre("save", async function (next) {
	const hashedPassword = await hash(this.password, 10);
	this.password = hashedPassword;
	next();
});

interface UserMethods {
	isValidPassword: (password: string) => Promise<boolean>;
}

type UserModelType = Model<IUser, {}, UserMethods>;

// Verifica si el modelo ya existe
const UserModel = mongoose.models.User || mongoose.model<IUser, UserModelType>("User", UserSchema);

UserSchema.method("isValidPassword", async function (password: string): Promise<boolean> {
	const isValid = await compare(password, this.password);
	return isValid;
});

export { UserModel };
