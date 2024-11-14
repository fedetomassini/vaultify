"use client";

import { useState, useCallback } from "react";
import { Copy, Plus, Trash2, Eye, EyeOff } from "lucide-react";
// Interfaces \\
import { PasswordEntry } from "@/lib/definitions";
// User Features\\
import { categoryOptions } from "@/lib/definitions";
// Components \\
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Selector } from "@/components/selector";

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

	return (
		<div className="min-h-screen bg-gray-900 text-gray-300 p-4 flex flex-col items-center">
			{/*  */}
      <Header/>
      {/*  */}
			<main className="w-full max-w-3xl mx-auto space-y-8">
				{/*  */}
				{/*  */}
				{/*  */}
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
				{/*  */}
				{/*  */}
				{/*  */}
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
							<Selector value={newPassword.category} onChange={handleCategoryChange} options={categoryOptions} />
						</div>
						<button
							onClick={handleAddPassword}
							className="w-full p-3 font-medium text-gray-900 bg-emerald-200/60 hover:bg-emerald-200/80 rounded-md"
						>
							Add Password
						</button>
					</div>
				</section>
				{/*  */}
				{/*  */}
				{/*  */}
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
				{/*  */}
				{/*  */}
				{/*  */}
			</main>
      {/*  */}
      <Footer/>
      {/*  */}
		</div>
	);
};