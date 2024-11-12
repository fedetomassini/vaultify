"use client";

import { useState, useCallback } from "react";
import { Copy, Plus, Trash2, Eye, EyeOff, Mail, Linkedin, Github, ChevronDown, User, Check } from "lucide-react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { env } from "@/lib/env";
// Interfaces \\
import { PasswordEntry, SelectProps } from "@/lib/definitions";
// User Features\\
import { languages, categoryOptions } from "@/lib/definitions";

/**
 * @alias UserPasswordManagement
 */

export const Board = () => {
	const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
	const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [passwordLength, setPasswordLength] = useState(12);
	const [useUppercase, setUseUppercase] = useState(true);
	const [useNumbers, setUseNumbers] = useState(true);
	const [useSymbols, setUseSymbols] = useState(true);
	const [newPassword, setNewPassword] = useState({
		site: "",
		username: "",
		password: "",
		category: "Entertainment",
	});
	const [language, setLanguage] = useState("en");
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const generatePassword = useCallback(() => {
		const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const lowercase = "abcdefghijklmnopqrstuvwxyz";
		const numbers = "0123456789";
		const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

		let chars = lowercase;
		if (useUppercase) chars += uppercase;
		if (useNumbers) chars += numbers;
		if (useSymbols) chars += symbols;

		let password = "";
		for (let i = 0; i < passwordLength; i++) {
			password += chars[Math.floor(Math.random() * chars.length)];
		}
		setGeneratedPassword(password);
	}, [passwordLength, useUppercase, useNumbers, useSymbols]);

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewPassword((prev) => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (value: string) => {
		setNewPassword((prev) => ({ ...prev, category: value }));
	};

	const handleAddPassword = () => {
		const newPasswordEntry = { ...newPassword, password: generatedPassword || newPassword.password, id: Date.now() };
		setPasswords((prev) => [...prev, newPasswordEntry]);
		setNewPassword({ site: "", username: "", password: "", category: "Entertainment" });
		setGeneratedPassword("");
	};

	const togglePasswordVisibility = (id: number) => {
		setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
	const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

	return (
		<div className="min-h-screen bg-gray-900 text-gray-300 p-4 flex flex-col items-center">
			<header className="w-full flex justify-between items-center mb-8">
				<div className="w-1/3"></div>
				<Image src="/logo.webp" width={120} height={120} alt="Vaultify" className="mx-auto" />
				<div className="w-1/3 flex flex-col items-end space-y-2">
					<div className="relative">
						<button
							onClick={toggleUserMenu}
							className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-200/50"
						>
							<User className="w-6 h-6" />
							<ChevronDown size={16} />
						</button>
						{isUserMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
								<button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 focus:outline-none">
									Profile
								</button>
								<button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 focus:outline-none">
									Settings
								</button>
								<button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 focus:outline-none">
									Logout
								</button>
							</div>
						)}
					</div>
					<div className="relative">
						<button
							onClick={toggleLanguageMenu}
							className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50"
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
										className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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
			<main className="w-full max-w-3xl mx-auto space-y-8">
				<section>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-emerald-200/80">Saved Passwords</h2>
						<button
							className="p-2 text-gray-900 rounded-full bg-emerald-200/60 hover:bg-emerald-200/70 focus:outline-none"
							aria-label="Add new password"
							onClick={() => {}}
						>
							<Plus className="w-5 h-5" />
						</button>
					</div>
					<div className="space-y-4">
						{passwords.length === 0 ? (
							<div className="text-gray-400">No saved passwords yet.</div>
						) : (
							passwords.map((item) => (
								<div key={item.id} className="bg-gray-800 rounded-md p-4">
									<div className="flex justify-between items-center">
										<span className="text-emerald-200/80 font-bold mb-3">{item.site}</span>
										<button
											className="text-red-400/40 hover:text-red-400/70 focus:outline-none"
											aria-label="Delete password"
										>
											<Trash2 className="w-5 h-5" />
										</button>
									</div>
									<div className="flex items-center space-x-2">
										<input
											type={showPasswords[item.id] ? "text" : "password"}
											value={showPasswords[item.id] ? item.password : "**************"}
											readOnly
											className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50 w-full"
										/>
										<button
											onClick={() => togglePasswordVisibility(item.id)}
											className="text-emerald-200/60 hover:text-emerald-200/70 focus:outline-none"
											aria-label={showPasswords[item.id] ? "Hide password" : "Show password"}
										>
											{showPasswords[item.id] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
										</button>
										<button
											onClick={() => copyToClipboard(item.password)}
											className="text-emerald-200/60 hover:text-emerald-200/70 focus:outline-none"
											aria-label="Copy password"
										>
											<Copy className="w-5 h-5" />
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</section>
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-emerald-200/80">Add New Password</h2>
					<div className="space-y-2">
						<input
							type="text"
							name="site"
							value={newPassword.site}
							onChange={handleNewPasswordChange}
							placeholder="Site"
							className="w-full p-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50"
						/>
						<div className="space-y-2">
							<label className="text-gray-300">Generated Password</label>
							<div className="relative">
								<input
									type="text"
									name="password"
									value={generatedPassword || newPassword.password}
									onChange={handleNewPasswordChange}
									placeholder="Password"
									readOnly={!generatedPassword}
									className="w-full p-3 pr-10 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50"
								/>
								<button
									onClick={() => copyToClipboard(generatedPassword || newPassword.password)}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-200/60 hover:text-emerald-200/70 focus:outline-none"
									aria-label="Copy password"
								>
									<Copy className="w-5 h-5" />
								</button>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-gray-300">Category</label>
							<CustomSelect value={newPassword.category} onChange={handleCategoryChange} options={categoryOptions} />
						</div>
						<button
							onClick={handleAddPassword}
							className="w-full p-3 font-medium text-gray-900 bg-emerald-200/60 hover:bg-emerald-200/80 rounded-md"
						>
							Add Password
						</button>
					</div>
				</section>
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-emerald-200/80">Password Generator</h2>
					<div className="bg-gray-800 rounded-lg p-6 space-y-4">
						<div>
							<label htmlFor="passwordLength" className="block text-gray-300 mb-1">
								Password Length
							</label>
							<input
								type="number"
								id="passwordLength"
								value={passwordLength}
								min={8}
								max={32}
								onChange={(e) => setPasswordLength(Number(e.target.value))}
								className="w-full p-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50"
							/>
						</div>
						<div className="space-y-2">
							<label className="block text-gray-300">
								<input
									type="checkbox"
									checked={useUppercase}
									onChange={() => setUseUppercase(!useUppercase)}
									className="mr-2"
								/>
								Include Uppercase Letters
							</label>
							<label className="block text-gray-300">
								<input
									type="checkbox"
									checked={useNumbers}
									onChange={() => setUseNumbers(!useNumbers)}
									className="mr-2"
								/>
								Include Numbers
							</label>
							<label className="block text-gray-300">
								<input
									type="checkbox"
									checked={useSymbols}
									onChange={() => setUseSymbols(!useSymbols)}
									className="mr-2 checked:bg-emerald-200/60 checked:border-emerald-200"
								/>
								Include Symbols
							</label>
						</div>
						<button
							onClick={generatePassword}
							className="w-full p-3 font-medium text-gray-900 bg-emerald-200/60 hover:bg-emerald-200/80 rounded-md"
						>
							Generate Password
						</button>
					</div>
				</section>
			</main>
			<footer className="mt-8 text-center">
				<p className="text-sm text-emerald-200/60 mb-2">{env.NEXT_PUBLIC_APP_VERSION}</p>
				<div className="flex justify-center space-x-4">
					<a href="mailto:contact@vaultify.com" className="text-emerald-200/60 hover:text-emerald-200/80">
						<Mail size={20} />
					</a>
					<a
						href="https://linkedin.com/company/vaultify"
						target="_blank"
						rel="noopener noreferrer"
						className="text-emerald-200/60 hover:text-emerald-200/80"
					>
						<Linkedin size={20} />
					</a>
					<a
						href="https://github.com/vaultify"
						target="_blank"
						rel="noopener noreferrer"
						className="text-emerald-200/60 hover:text-emerald-200/80"
					>
						<Github size={20} />
					</a>
				</div>
			</footer>
		</div>
	);
};

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, options }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full p-3 bg-emerald-200/10 text-emerald-200/80 rounded-md flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-emerald-200/50"
			>
				{options.find((option) => option.value === value)?.label || "Select category"}
				<ChevronDown
					size={20}
					className={`transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
				/>
			</button>
			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-gray-800 border border-emerald-200/20 rounded-md shadow-lg">
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => {
								onChange(option.value);
								setIsOpen(false);
							}}
							className="w-full px-4 py-2 text-left text-emerald-200/80 hover:bg-emerald-200/10 focus:outline-none focus:bg-emerald-200/20 flex items-center justify-between"
						>
							{option.label}
							{value === option.value && <Check size={16} className="text-emerald-400" />}
						</button>
					))}
				</div>
			)}
		</div>
	);
};
