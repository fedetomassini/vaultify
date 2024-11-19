import { connectDB } from "@/lib/db/mongo";
import NextAuth, { CredentialsSignin } from "next-auth";
import { env } from "@/lib/env";
import credentials from "next-auth/providers/credentials";
// Models \\
import { UserModel } from "@/lib/db/models";

class InvalidLoginError extends CredentialsSignin {
	code = "Username or password are invalid.";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		credentials({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
				email: { label: "Email", type: "email" },
			},
			async authorize(credentials: any) {
				await connectDB();
				const user: any = await UserModel.findOne({ username: credentials.username });

				if (user && (await user.verifyPassword(credentials.password))) {
					return {
						id: user._id.toString(),
						name: user.username,
						email: user.email,
					};
				}

				throw new InvalidLoginError();
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 900,
		updateAge: 900,
	},
	jwt: {
		maxAge: 900,
	},
	callbacks: {
		async signIn({ user }) {
			return user ? true : false;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id as string,
				name: token.name as string,
				email: token.email as string,
			} as any;
			return session;
		},
	},
	secret: env.NEXT_AUTH_SECRET,
});
