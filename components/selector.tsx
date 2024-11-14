import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
// Interfaces \\
import { SelectProps } from "@/lib/definitions";

export const Selector: React.FC<SelectProps> = ({ value, onChange, options }) => {
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