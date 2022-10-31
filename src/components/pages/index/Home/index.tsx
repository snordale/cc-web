import { Box, Typography } from "@mui/material";

import { useMeQuery } from "../../../../generated/graphql";

export const Home: React.FC<{}> = ({}) => {
	const [{ data, fetching }] = useMeQuery();

	if (fetching) return null;

	return (
		<Box>
			<Typography>Welcome {data?.me?.username}.</Typography>
		</Box>
	);
};
