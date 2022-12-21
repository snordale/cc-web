import { Box, Typography } from "@mui/material";

import { fontSizes } from "../../../style";
import { useGetPlaylists } from "../../../services/rq";

export const Playlists: React.FC = () => {
	const { data } = useGetPlaylists();

	console.log(data);

	const renderPlaylists = (playlists) => {
		return playlists.map((playlist) => (
			<Box>
				<Typography>{playlist.name}</Typography>
			</Box>
		));
	};

	return (
		<Box paddingTop={3}>
			<Typography fontSize={fontSizes.header}>Playlists</Typography>
			<Typography>Check out the works in progress.</Typography>
			{data && renderPlaylists(data.playlists)}
		</Box>
	);
};
