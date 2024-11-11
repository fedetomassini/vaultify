"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Mail, KeyRound } from "lucide-react";

export const AuthPanel = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const toggleForm = () => setIsLogin(!isLogin);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 p-4">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md"
			>
				<div className="bg-gray-800 shadow-lg rounded-lg p-8">
					{/*  */}
					<div className="text-center mb-8">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 260, damping: 20 }}
							className="inline-block p-3 rounded-full bg-emerald-400 mb-4"
						>
							<Lock className="w-8 h-8 text-gray-900" />
						</motion.div>
						<h2 className="text-3xl font-bold text-emerald-300">Vaultify</h2>
					</div>
					{/*  */}
					<AnimatePresence mode="wait">
						<motion.form
							key={isLogin ? "login" : "register"}
							initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
							transition={{ duration: 0.3 }}
							className="space-y-6"
						>
							{!isLogin && (
								<div>
									<label htmlFor="name" className="block text-sm font-medium mb-2 text-emerald-200">
										Username
									</label>
									<motion.div whileFocus={{ scale: 1.02 }} className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" size={18} />
										<input
											type="text"
											id="name"
											disabled
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50 text-gray-300"
											placeholder="Insert a username..."
										/>
									</motion.div>
								</div>
							)}
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2 text-emerald-200">
									Email
								</label>
								<motion.div whileFocus={{ scale: 1.02 }} className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" size={18} />
									<input
										type="email"
										id="email"
										disabled
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50 text-gray-300"
										placeholder="Insert a valid email..."
									/>
								</motion.div>
							</div>
							<div>
								<label htmlFor="password" className="block text-sm font-medium mb-2 text-emerald-200">
									Password
								</label>
								<motion.div whileFocus={{ scale: 1.02 }} className="relative">
									<KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" size={18} />
									<input
										type="password"
										id="password"
										disabled
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50 text-gray-300"
										placeholder="•••••••••••••"
									/>
								</motion.div>
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								disabled
								className="w-full py-2 px-4 bg-emerald-400 hover:bg-emerald-500 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
							>
								{isLogin ? "Sign in" : "Sign Up"}
							</motion.button>
						</motion.form>
					</AnimatePresence>
					{/*  */}
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
									className="block text-sm text-emerald-300 hover:underline"
								>
									Forgot password?
								</motion.a>
							) : null}
						</AnimatePresence>
						<motion.button
							onClick={toggleForm}
							className="text-sm text-emerald-300 hover:underline"
							whileHover={{ scale: 1.015 }}
							whileTap={{ scale: 0.95 }}
						>
							{isLogin ? "Don't have an account? Sign Up" : "Have an account? Log in"}
						</motion.button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
