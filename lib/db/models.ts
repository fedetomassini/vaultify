import mongoose, { Model } from "mongoose";
import { compareSync, hashSync } from "bcryptjs";

interface IUser {
	username: string;
	email: string;
	password: string;
}

interface UserMethods {
	isValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser, UserModelType, UserMethods>({
	username: String,
	email: String,
	password: String,
});

UserSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password") || (this.isModified("password") && typeof this.password === "string")) {
			const hashedPassword = await hashSync(this.password, 10);
			this.password = hashedPassword;
		}
		return next();
	} catch (error: any) {
		return next(error);
	}
});

type UserModelType = Model<IUser, {}, UserMethods>;

const UserModel = mongoose.models.User || mongoose.model<IUser, UserModelType>("User", UserSchema);

UserSchema.method("isValidPassword", async function (password: string): Promise<boolean> {
	const isValid = await compareSync(password, this.password);
	return isValid;
});

export { UserModel };
