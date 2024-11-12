import { auth } from "@/lib/auth";
// Components \\
import { AuthPanel } from "@/components/authentication";
import { Board } from "@/components/board";

/**
 * @readonly
 */

export default async function Root() {
	const session = await auth();
	return <>{session ? <Board /> : <AuthPanel />}</>;
}
