import { cookies } from "next/headers";
// Components \\
import { AuthPanel } from "@/components/authentication";
import { Board } from "@/components/board";

/**
 * @readonly
 */

export default async function Root() {
	const token = cookies().get("vault_token")?.value;

	return <>{token ? <Board /> : <AuthPanel />}</>;
}
