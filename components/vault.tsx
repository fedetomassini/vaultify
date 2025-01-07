"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, Plus, Trash2, Eye, EyeOff, Lock, Globe, Key, RefreshCw, Save, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export const UserVault = () => {
	const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
	const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [passwordLength, setPasswordLength] = useState(12);
	const [useUppercase, setUseUppercase] = useState(true);
	const [useNumbers, setUseNumbers] = useState(true);
	const [useSymbols, setUseSymbols] = useState(true);
	const [newPassword, setNewPassword] = useState({
		site: "",
		password: "",
		category: "Entertainment",
	});

	useEffect(() => {
		const fetchPasswords = async () => {
			try {
				const response = await fetch("/api/user/passwords", {
					method: "GET",
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					setPasswords(data);
				} else {
					console.error("Failed to fetch passwords");
				}
			} catch (error) {
				console.error("Error fetching passwords:", error);
			}
		};

		fetchPasswords();
	}, []);

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

	const handleAddPassword = async () => {
		const newPasswordEntry = {
			site: newPassword.site,
			password: generatedPassword || newPassword.password,
			category: newPassword.category,
		};

		try {
			const response = await fetch("/api/user/passwords", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(newPasswordEntry),
			});

			if (response.ok) {
				const savedPassword = await response.json();
				setPasswords((prev) => [...prev, savedPassword]);
				setNewPassword({ site: "", password: "", category: "Entertainment" });
				setGeneratedPassword("");
			} else {
				console.error("Failed to save password.");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const togglePasswordVisibility = (id: number) => {
		setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const handleDeletePassword = async (id: number) => {
		try {
			const response = await fetch(`/api/user/passwords/${id}`, {
				method: "DELETE",
				credentials: "include",
			});
			if (response.ok) {
				setPasswords((prev) => prev.filter((password) => password.id !== id));
			} else {
				console.error("Failed to delete password");
			}
		} catch (error) {
			console.error("Error deleting password:", error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen bg-gray-900 text-gray-300 p-4 flex flex-col items-center"
		>
			<Header />
			<motion.main
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className="w-full max-w-3xl mx-auto space-y-8"
			>
				<motion.section
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-emerald-200/80 flex items-center">
							<List className="mr-2" />
							Saved Passwords
						</h2>
					</div>
					<AnimatePresence>
						{passwords.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="text-gray-400 flex items-center justify-center p-4"
							>
								<Lock className="mr-2" />
								No saved passwords yet.
							</motion.div>
						) : (
							passwords.map((item) => (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
									className="bg-gray-800 rounded-md p-4 mb-4"
								>
									<div className="flex justify-between items-center">
										<span className="text-emerald-200/80 font-bold mb-3 flex items-center">
											<Globe className="mr-2" />
											{item.site}
										</span>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											onClick={() => handleDeletePassword(item.id)}
											className="text-red-400/40 hover:text-red-400/70 focus:outline-none"
											aria-label="Delete password"
										>
											<Trash2 className="w-5 h-5" />
										</motion.button>
									</div>
									<div className="flex items-center space-x-2">
										<div className="relative flex-grow">
											<Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200/60" />
											<input
												type={showPasswords[item.id] ? "text" : "password"}
												value={showPasswords[item.id] ? item.password : "**************"}
												readOnly
												className="bg-gray-700 text-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50 w-full transition-colors"
											/>
										</div>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											onClick={() => togglePasswordVisibility(item.id)}
											className="text-emerald-200/60 hover:text-emerald-200/70 focus:outline-none"
											aria-label={showPasswords[item.id] ? "Hide password" : "Show password"}
										>
											{showPasswords[item.id] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											onClick={() => copyToClipboard(item.password)}
											className="text-emerald-200/60 hover:text-emerald-200/70 focus:outline-none transition-colors"
											aria-label="Copy password"
										>
											<Copy className="w-5 h-5" />
										</motion.button>
									</div>
								</motion.div>
							))
						)}
					</AnimatePresence>
				</motion.section>
				<motion.section
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					className="space-y-4"
				>
					<h2 className="text-2xl font-semibold text-emerald-200/80 flex items-center">
						<Plus className="mr-2" />
						Add New Password
					</h2>
					<div className="space-y-2">
						<label className="text-gray-300 flex items-center">
							<Globe className="mr-2" />
							Website
						</label>
						<motion.input
							whileFocus={{ scale: 1.02 }}
							type="text"
							name="site"
							value={newPassword.site}
							onChange={handleNewPasswordChange}
							placeholder="example - www.facebook.com"
							className="w-full p-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50 transition-colors"
						/>
						<div className="space-y-2">
							<label className="text-gray-300 flex items-center">
								<Key className="mr-2" />
								Generated Password
							</label>
							<div className="relative">
								<motion.input
									whileFocus={{ scale: 1.02 }}
									type="text"
									name="password"
									value={generatedPassword || newPassword.password}
									onChange={handleNewPasswordChange}
									placeholder="Your password will be here..."
									readOnly={!generatedPassword}
									className="w-full p-3 pr-10 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50 transition-colors"
								/>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={() => copyToClipboard(generatedPassword || newPassword.password)}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-200/60 hover:text-emerald-200/70 focus:outline-none transition-colors"
									aria-label="Copy password"
								>
									<Copy className="w-5 h-5" />
								</motion.button>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-gray-300 flex items-center">
								<List className="mr-2" />
								Category
							</label>
							<Selector value={newPassword.category} onChange={handleCategoryChange} options={categoryOptions} />
						</div>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleAddPassword}
							className="w-full p-3 font-medium text-gray-900 bg-emerald-200/60 hover:bg-emerald-200/80 rounded-md transition-colors flex items-center justify-center"
						>
							<Save className="mr-2" />
							Add Password
						</motion.button>
					</div>
				</motion.section>
				<motion.section
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="space-y-4"
				>
					<h2 className="text-2xl font-semibold text-emerald-200/80 flex items-center">
						<RefreshCw className="mr-2" />
						Password Generator
					</h2>
					<div className="bg-gray-800 rounded-lg p-6 space-y-4">
						<div>
							<label htmlFor="passwordLength" className="block text-gray-300 mb-1 flex items-center">
								<Key className="mr-2" />
								Password Length
							</label>
							<motion.input
								whileFocus={{ scale: 1.02 }}
								type="number"
								id="passwordLength"
								value={passwordLength}
								min={8}
								max={32}
								onChange={(e) => setPasswordLength(Number(e.target.value))}
								className="w-full p-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50 transition-colors"
							/>
						</div>
						<div className="space-y-2">
							<label className="block text-gray-300 flex items-center">
								<input
									type="checkbox"
									checked={useUppercase}
									onChange={() => setUseUppercase(!useUppercase)}
									className="mr-2"
								/>
								Include Uppercase Letters
							</label>
							<label className="block text-gray-300 flex items-center">
								<input
									type="checkbox"
									checked={useNumbers}
									onChange={() => setUseNumbers(!useNumbers)}
									className="mr-2"
								/>
								Include Numbers
							</label>
							<label className="block text-gray-300 flex items-center">
								<input
									type="checkbox"
									checked={useSymbols}
									onChange={() => setUseSymbols(!useSymbols)}
									className="mr-2 checked:bg-emerald-200/60 checked:border-emerald-200 transition-colors"
								/>
								Include Symbols
							</label>
						</div>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={generatePassword}
							className="w-full p-3 font-medium text-gray-900 bg-emerald-200/60 hover:bg-emerald-200/80 rounded-md transition-colors flex items-center justify-center"
						>
							<RefreshCw className="mr-2" />
							Generate Password
						</motion.button>
					</div>
				</motion.section>
			</motion.main>
			<Footer />
		</motion.div>
	);
};
