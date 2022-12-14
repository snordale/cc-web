import { Box, Button, Typography } from "@mui/material";

import Link from "next/link";
import { routes } from "../../../utils/routes";

const JoinLink = () => (
	<Box width="100%" display="flex" pt={2}>
		<Link href={routes.join} style={{ textDecoration: "none" }} passHref>
			<Button variant="outlined" size="large" sx={{ width: "150px" }}>
				<Typography>Join</Typography>
			</Button>
		</Link>
	</Box>
);

export default JoinLink;
