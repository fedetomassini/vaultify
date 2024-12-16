import type { Metadata } from "next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Bounce, ToastContainer } from "react-toastify";
// Global Styles \\
import "@/app/_globals.scss";
import "react-toastify/ReactToastify.css";
// Metadata \\
export const metadata: Metadata = {
	title: "Vaultify",
	description:
		"«A secure and reliable password management tool that allows you to efficiently store, generate and organise passwords» ",
	authors: {
		name: "Federico Tomassini",
		url: "https://www.linkedin.com/in/fedetomassini/",
	},
	creator: "Federico Tomassini",
	publisher: "Novabyte Studio",
	openGraph: {
		title: "Vaultify",
		description:
			"«A secure and reliable password management tool that allows you to efficiently store, generate and organise passwords» ",
		type: "website",
		url: "https://vaultify.vercel.app",
		images: {
			url: "https://vaultify.vercel.app/favicon.ico",
			type: "image/x-icon",
		},
		siteName: "Vaultify",
		locale: "English",
	},
	twitter: {
		title: "Vaultify",
		site: "https://vaultify.vercel.app",
		description:
			"«A secure and reliable password management tool that allows you to efficiently store, generate and organise passwords» ",
		images: {
			url: "https://vaultify.vercel.app/favicon.ico",
			type: "image/x-icon",
		},
	},
};

export default function RootLayout(
	{
		children,
	}: Readonly<{
		children: React.ReactNode;
	}>,
	session: Session,
) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<SessionProvider session={session}>
					<main>
						{children}
						<ToastContainer
							className="font-sans max-md:flex max-md:justify-center max-md:[5%]"
							position="bottom-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={true}
							closeOnClick
							rtl={false}
							pauseOnHover={true}
							pauseOnFocusLoss={false}
							draggable
							theme="light"
							transition={Bounce}
						/>
					</main>
				</SessionProvider>
			</body>
		</html>
	);
}
