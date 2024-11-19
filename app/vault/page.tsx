import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// Components \\
import { UserVault } from "@/components/vault";

export default function Vault() {
	const token = cookies().get("v_token")?.value;

	!token ? redirect("/") : null;

	return <UserVault />;
}
