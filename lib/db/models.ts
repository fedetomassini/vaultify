import mongoose, { Schema, Model } from "mongoose";
import { hashSync, compareSync } from "bcryptjs";

/**
 * @alias Interfaces
 */
interface IPassword {
	site: string;
	username: string;
	password: string;
	category: string;
	createdAt: Date;
}

interface IUser {
	username: string;
	email: string;
	password: string;
	passwords: IPassword[];
}

interface UserMethods {
	isValidPassword: (password: string) => boolean;
}

/**
 * @alias Schemas
 */

const PasswordSchema = new Schema<IPassword>({
	site: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	category: { type: String, default: "General" },
	createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema<IUser, UserModelType, UserMethods>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	passwords: [PasswordSchema],
});

UserSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return next();

	try {
		user.password = hashSync(user.password, 10);
		next();
	} catch (error: any) {
		next(error);
	}
});

UserSchema.method("isValidPassword", function (password: string): boolean {
	return compareSync(password, this.password);
});

type UserModelType = Model<IUser, {}, UserMethods>;
const UserModel = mongoose.models.User || mongoose.model<IUser, UserModelType>("User", UserSchema);

export { UserModel };
