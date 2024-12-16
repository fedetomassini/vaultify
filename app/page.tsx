import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// Components \\
import { AuthPanel } from "@/components/authentication";

/**
 * @readonly
 */

export default async function Root() {
	const session = await auth();
	const token = cookies().get("vaultify_tk")?.value;

	session ? redirect("/vault") : null;

	return <AuthPanel />;
}
