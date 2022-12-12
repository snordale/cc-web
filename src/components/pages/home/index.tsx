import { Box, Typography } from "@mui/material";
import { fontSizes, paddingX } from "../../../style";

import { NormalPage } from "../../common/NormalPage";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const Home: React.FC = () => {
	const router = useRouter();

	const { data, isUserLoaded, isLoggedIn } = useUser();

	if (!isLoggedIn && router.isReady) router.push("/");

	if (!isUserLoaded) return null;

	return (
		<NormalPage>
			<Box display="flex" width="100%" paddingX={paddingX.global}>
				<Typography fontSize={fontSizes.header}>
					Welcome {data?.user.username}.
				</Typography>
			</Box>
		</NormalPage>
	);
};
