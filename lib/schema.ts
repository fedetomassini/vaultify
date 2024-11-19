import { z } from "zod";

export const AuthValidation = z.object({
	// # \\
	username: z
		.string({
			required_error: "You need to provide a username.",
			invalid_type_error: "The username you entered is invalid or doesn't exist.",
		})
		.min(1, {
			message: "You need to provide a username.",
		})
		.max(15, {
			message: "Username cannot be longer than 15 characters.",
		}),
	// # \\
	email: z
		.string({
			required_error: "You need to provide an email.",
			invalid_type_error: "The email you entered is invalid or doesn't exist.",
		})
		.min(1, {
			message: "You need to provide an email.",
		})
		.max(30, {
			message: "Email cannot be longer than 30 characters.",
		}),
	// # \\
	password: z
		.string({
			required_error: "You need to provide a password.",
			invalid_type_error: "The password you entered is invalid.",
		})
		.min(10, {
			message: "Password cannot be less than 10 characters.",
		})
		.max(50, {
			message: "Password cannot be longer than 50 characters.",
		}),
});
