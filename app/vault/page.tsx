import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// Components \\
import { UserVault } from "@/components/vault";

export default async function Vault() {
	const session = await auth();
	const token = cookies().get("vaultify_tk")?.value;

	!session ? redirect("/") : null;

	return <UserVault />;
}
