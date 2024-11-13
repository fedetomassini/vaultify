import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DB_USER: z.string().min(1),
		DB_PASSWORD: z.string().min(1),
		DB_NETWORK: z.string().min(1),
		DB_NAME: z.string().min(1),
		JWT_SECRET: z.string().min(1),
		NEXT_AUTH_SECRET: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_APP_VERSION: z.string().min(1),
		// NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
	},
	runtimeEnv: {
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_NETWORK: process.env.DB_NETWORK,
		DB_NAME: process.env.DB_NAME,
		JWT_SECRET: process.env.JWT_SECRET,
		NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
		// NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
		NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
	},
});
