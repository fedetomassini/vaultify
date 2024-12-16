import { connectDB } from "@/lib/db/mongo";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { env } from "@/lib/env";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "@/lib/db/models";

export const config: NextAuthConfig = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await connectDB();
				const user = await UserModel.findOne({ username: credentials?.username });

				if (user && credentials?.password) {
					const isValid = await user.isValidPassword(credentials.password);
					if (isValid) {
						return {
							id: user._id.toString(),
							name: user.username,
							email: user.email,
						};
					}
				}
				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 15 * 60,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
	debug: process.env.NODE_ENV === "development",
	secret: env.NEXT_AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
