import { Box, Typography } from "@mui/material";

import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const Playlists: React.FC = () => {
	const router = useRouter();

	const { data, isUserLoaded, isLoggedIn } = useUser();

	return (
		<Box>
			<Typography>Playlists</Typography>
			<Typography>Thanks for contributing.</Typography>
		</Box>
	);
};