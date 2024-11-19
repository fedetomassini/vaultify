import { Mail, Linkedin, Github } from "lucide-react";
import { env } from "@/lib/env";

export const Footer = () => {
	return (
		<>
			<footer className="mt-8 text-center">
				<p className="text-sm text-emerald-200/60 mb-2">{env.NEXT_PUBLIC_APP_VERSION}</p>
				<div className="flex justify-center space-x-4">
					<a
						href="mailto:fedetomassini.dev@gmail.com"
						className="text-emerald-200/60 hover:text-emerald-200/80 transition-colors"
					>
						<Mail size={20} />
					</a>
					<a
						href="https://linkedin.com/in/fedetomassini"
						target="_blank"
						rel="noopener noreferrer"
						className="text-emerald-200/60 hover:text-emerald-200/80 transition-colors"
					>
						<Linkedin size={20} />
					</a>
					<a
						href="https://github.com/fedetomassini/vaultify"
						target="_blank"
						rel="noopener noreferrer"
						className="text-emerald-200/60 hover:text-emerald-200/80 transition-colors"
					>
						<Github size={20} />
					</a>
				</div>
			</footer>
		</>
	);
};
