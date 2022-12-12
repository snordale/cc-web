import { NextPage } from "next";
import { NormalPage } from "../src/components/common/NormalPage";
import { SendResetForm } from "../src/components/pages/reset-password/SendResetForm";
import { SetPasswordForm } from "../src/components/pages/reset-password/SetPasswordForm";
import { useRouter } from "next/router";

const ResetPassword: NextPage<{ token: string | undefined }> = ({ token }) => {
	const router = useRouter();

	return (
		<NormalPage>
			{router.query.token ? <SetPasswordForm /> : <SendResetForm />}
		</NormalPage>
	);
};

export default ResetPassword;
