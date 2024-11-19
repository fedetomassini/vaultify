import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// Components \\
import { AuthPanel } from "@/components/authentication";

/**
 * @readonly
 */

export default async function Root() {
	const token = cookies().get("v_token")?.value;

	token ? redirect("/vault") : null;

	return <AuthPanel />;
}
