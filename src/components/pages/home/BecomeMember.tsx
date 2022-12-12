import { Box, Typography } from "@mui/material";

import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const BecomeMember: React.FC = () => {
	const router = useRouter();

	const { data, isUserLoaded, isLoggedIn } = useUser();

	return (
		<Box>
			<Typography>Become a contributor!</Typography>
			<Typography>
				Contributors get access to our weekly playlists.
			</Typography>
		</Box>
	);
};
