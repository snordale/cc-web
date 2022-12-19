import { Box, Typography } from "@mui/material";
import { fontSizes, paddingX } from "../../../style";

import { Contributor } from "./Contributor";
import { NonContributor } from "./NonContributor";
import { NormalPage } from "../../common/NormalPage";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const Home: React.FC = () => {
	const router = useRouter();

	const { data, isUserLoaded, isLoggedIn, isContributor } = useUser();

	if (!isLoggedIn && router.isReady) router.push("/");

	if (!isUserLoaded) return null;

	return (
		<NormalPage>
			<Box display="flex" width="100%" flexDirection="column">
				<Typography fontSize={fontSizes.header}>
					Welcome {data?.user.username}.
				</Typography>
				{isContributor ? <Contributor /> : <NonContributor />}
			</Box>
		</NormalPage>
	);
};
