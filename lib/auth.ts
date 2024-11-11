import { connectDB } from "@/lib/db/mongo";
import NextAuth, { CredentialsSignin } from "next-auth";
import { env } from "@/lib/env";
import credentials from "next-auth/providers/credentials";
import { UserModel } from "@/lib/db/models";

class InvalidLoginError extends CredentialsSignin {
	code = "El usuario o la contraseña son incorrectos.";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		credentials({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any) {
				await connectDB();
				const user: any = await UserModel.findOne({ username: credentials.username });

				if (user && (await user.verifyPassword(credentials.password))) {
					return {
						id: user._id.toString(),
						name: user.username,
					};
				}

				throw new InvalidLoginError();
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 15 * 15,
		updateAge: 15 * 15,
	},
	jwt: {
		maxAge: 15 * 15,
	},
	callbacks: {
		async signIn({ user }) {
			return user ? true : false;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id as string,
				name: token.name as string,
			} as any;
			return session;
		},
	},
	secret: env.NEXT_AUTH_SECRET,
});
