import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const LoadingScreen = () => {
	return (
		<div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center">
			<ProgressBar height="4px" color="#34d399" options={{ showSpinner: false }} shallowRouting />
			<div className="text-center mt-8">
				<h2 className="text-2xl font-semibold text-emerald-200/80">Logging in...</h2>
				<p className="mt-2 text-emerald-200/60">Securing your session...</p>
			</div>
		</div>
	);
};
