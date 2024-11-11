import { auth } from "@/lib/auth";
// Components \\
import { AuthPanel } from "@/components/authpanel";
import { Home } from "@/components/home";

export default async function Root() {
	const session = await auth();
	return <>{session ? <Home /> : <AuthPanel />}</>;
}
