import { useState } from "react";
import Image from "next/image";
import { User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
// User Features \\
import { languages } from "@/lib/definitions";

export const Header = () => {
	const [language, setLanguage] = useState("en");
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const navigate = useRouter();

	const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
	const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

	const handleLogout = async () => {
		try {
			await fetch("/api/auth/signout", {
				method: "GET",
				credentials: "include",
			});
			navigate.push("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<>
			<header className="w-full flex justify-between items-center mb-8">
				<div className="w-1/3"></div>
				<Image src="/logo.webp" width={120} height={120} alt="Vaultify" className="mx-auto" />
				<div className="w-1/3 flex flex-col items-end space-y-2">
					<div className="relative">
						<button
							onClick={toggleUserMenu}
							className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-md focus:outline-none transition-colors"
						>
							<User className="w-6 h-6" />
							<ChevronDown size={16} />
						</button>
						{isUserMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
								<button
									disabled={true}
									className="w-full text-left px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-600 focus:outline-none transition-colors disabled:opacity-50"
								>
									Profile
								</button>
								<button
									disabled={true}
									className="w-full text-left px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-600 focus:outline-none transition-colors disabled:opacity-50"
								>
									Settings
								</button>
								<button
									onClick={handleLogout}
									className="w-full text-left px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-600 focus:outline-none transition-colors disabled:opacity-50"
								>
									Logout
								</button>
							</div>
						)}
					</div>
					<div className="relative">
						<button
							onClick={toggleLanguageMenu}
							className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-md focus:outline-none transition-colors"
						>
							<ReactCountryFlag
								countryCode={languages.find((lang) => lang.code === language)?.countryCode || "GB"}
								svg
								style={{
									width: "1.5em",
									height: "1.5em",
								}}
								title={language}
								className="rounded-full"
							/>
							<span className="text-sm">{language.toUpperCase()}</span>
							<ChevronDown size={16} />
						</button>
						{isLanguageMenuOpen && (
							<div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg z-10">
								{languages.map((lang) => (
									<button
										key={lang.code}
										onClick={() => {
											setLanguage(lang.code);
											setIsLanguageMenuOpen(false);
										}}
										className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 transition-colors"
									>
										<ReactCountryFlag
											countryCode={lang.countryCode}
											svg
											style={{
												width: "1.5em",
												height: "1.5em",
											}}
											title={lang.name}
											className="rounded-full"
										/>
										<span>{lang.name}</span>
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</header>
		</>
	);
};
