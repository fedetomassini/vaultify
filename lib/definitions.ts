// Interfaces \\
export interface PasswordEntry {
	id: number;
	site: string;
	username: string;
	password: string;
	category: string;
}

export interface SelectProps {
	value: string;
	onChange: (value: string) => void;
	options: { value: string; label: string }[];
}
// User Features \\
export const languages = [
	{ code: "en", name: "English", countryCode: "GB" },
	// { code: "es", name: "Español", countryCode: "ES" },
];

export const categoryOptions = [
	{ value: "Entertainment", label: "Entertainment" },
	{ value: "Development", label: "Development" },
	{ value: "Finance", label: "Finance" },
	{ value: "Social", label: "Social" },
];
