"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, KeyRound, ChevronDown, Linkedin, Github } from "lucide-react";
import { env } from "@/lib/env";
import ReactCountryFlag from "react-country-flag";
// User Features\\
import { languages } from "@/lib/definitions";

/**
 * @alias UserAuthentication
 */

export const AuthPanel = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUserName] = useState("");
	const [language, setLanguage] = useState("en");
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
	const [error, setError] = useState("");

	const toggleForm = () => {
		setIsLogin(!isLogin);
		setError("");
	};

	const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (isLogin) {
			try {
				const response = await fetch("/api/auth/signin", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, email, password }),
				});

				if (!response.ok) {
					const data = await response.json();
					setError(data.message);
				}
			} catch (err) {
				setError("An error occurred. Please try again.");
			}
		} else {
			try {
				const response = await fetch("/api/auth/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, email, password }),
				});

				if (!response.ok) {
					const data = await response.json();
					setError(data.message);
				}
			} catch (err) {
				setError("An error occurred. Please try again.");
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 p-4">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md relative"
			>
				<div className="bg-gray-800 shadow-lg rounded-lg p-8">
					<div className="absolute top-4 right-4">
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
					<div className="text-center mb-8">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 260, damping: 20 }}
						>
							<Image src="/logo.webp" width={100} height={100} alt="Vaultify" className="mx-auto" />
						</motion.div>
						<p className="text-sm text-emerald-200/60 mt-2">{env.NEXT_PUBLIC_APP_VERSION}</p>
					</div>
					<AnimatePresence mode="wait">
						<motion.form
							key={isLogin ? "login" : "register"}
							initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
							transition={{ duration: 0.3 }}
							className="space-y-6"
							onSubmit={handleSubmit}
						>
							<div>
								<label htmlFor="username" className="block text-sm font-medium mb-2 text-emerald-200/80">
									{isLogin ? "Username" : "Choose a username"}
								</label>
								<motion.div whileFocus={{ scale: 1.02 }} className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200/70" size={18} />
									<input
										type="text"
										id="username"
										value={username}
										onChange={(e) => setUserName(e.target.value)}
										className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50  disabled:opacity-50 text-gray-300"
										placeholder="Enter your username..."
										autoComplete="off"
										autoCorrect="off"
										min={1}
										minLength={1}
										max={15}
										maxLength={15}
									/>
								</motion.div>
							</div>
							{!isLogin && (
								<div>
									<label htmlFor="email" className="block text-sm font-medium mb-2 text-emerald-200/80">
										Email
									</label>
									<motion.div whileFocus={{ scale: 1.02 }} className="relative">
										<Mail
											className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200/70"
											size={18}
										/>
										<input
											type="email"
											id="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50 disabled:opacity-50 text-gray-300"
											placeholder="Insert a valid email..."
											autoComplete="off"
											autoCorrect="off"
											min={1}
											minLength={1}
											max={30}
											maxLength={30}
										/>
									</motion.div>
								</div>
							)}
							<div>
								<label htmlFor="password" className="block text-sm font-medium mb-2 text-emerald-200/80">
									Password
								</label>
								<motion.div whileFocus={{ scale: 1.02 }} className="relative">
									<KeyRound
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200/70"
										size={18}
									/>
									<input
										type="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-200/50 disabled:opacity-50 text-gray-300"
										placeholder="•••••••••••••"
										autoComplete="off"
										autoCorrect="off"
										min={1}
										minLength={1}
										max={50}
										maxLength={50}
									/>
								</motion.div>
							</div>
							{error && <p className="text-red-400 text-sm">{error}</p>}
							<motion.button
								whileHover={{ scale: 1.015 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								className="w-full py-2 px-4 bg-emerald-200/60 hover:bg-emerald-200/80 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
							>
								{isLogin ? "Sign in" : "Sign Up"}
							</motion.button>
						</motion.form>
					</AnimatePresence>
					<div className="mt-6 text-center space-y-2">
						<AnimatePresence mode="wait">
							{isLogin ? (
								<motion.a
									key="forgot-password"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.2 }}
									href="#"
									className="block text-sm text-emerald-200/80 hover:underline underline-offset-4"
								>
									Forgot password?
								</motion.a>
							) : null}
						</AnimatePresence>
						<motion.button
							onClick={toggleForm}
							className="text-sm text-emerald-200/80 hover:underline underline-offset-4"
							whileHover={{ scale: 1.015 }}
							whileTap={{ scale: 0.95 }}
						>
							{isLogin ? "Don't have an account? Sign Up" : "Have an account? Log in"}
						</motion.button>
					</div>
					<div className="mt-6 flex justify-center space-x-4">
						<a href="mailto:fedetomassini.dev@gmail.com" className="text-emerald-200/80 hover:text-emerald-200">
							<Mail size={20} />
						</a>
						<a
							href="https://linkedin.com/in/fedetomassini"
							target="_blank"
							rel="noopener noreferrer"
							className="text-emerald-200/80 hover:text-emerald-200"
						>
							<Linkedin size={20} />
						</a>
						<a
							href="https://github.com/fedetomassini/vaultify"
							target="_blank"
							rel="noopener noreferrer"
							className="text-emerald-200/80 hover:text-emerald-200"
						>
							<Github size={20} />
						</a>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
