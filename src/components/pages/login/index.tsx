import { Box, Fade } from "@mui/material";

import CenteredForm from "../../common/CenteredForm";
import { Header } from "./Header";
import Image from "next/image";
import { Link } from "../../common/Link";
import { LoginForm } from "./LoginForm";
import { NormalPage } from "../../common/NormalPage";
import { fontSizes } from "../../../style";
import roseVinyl from "../../../../public/rose-vinyl.png";
import { routes } from "../../../utils/routes";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export * from "./Header";
export * from "./LoginForm";

export const Login = () => {
	const router = useRouter();

	const { isLoggedIn } = useUser();

	if (isLoggedIn) router.replace(routes.home);

	return (
		<NormalPage>
			<CenteredForm>
				<Box position="relative" width="74px" height="50px">
					<Image
						src={roseVinyl}
						alt="Drawing of music sharing website."
						fill
						style={{
							objectFit: "cover",
						}}
					/>
				</Box>
				<Header />
				<LoginForm />
				<Box display="flex">
					<Link
						text="Forgot Password?"
						href="/reset-password"
						fontSize={fontSizes.small}
					/>
				</Box>
			</CenteredForm>
		</NormalPage>
	);
};
