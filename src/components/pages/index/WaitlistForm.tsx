import { Box, Button, Input, TextField, Typography } from "@mui/material";

import Link from "next/link";
import { routes } from "../../../utils/routes";
import { useState } from "react";

const JoinLink = () => {
	const [value, setValue] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection={["column", "row"]}
			gap={2}
		>
			<TextField
				type="email"
				placeholder="Email"
				label="Email"
				value={value}
				onChange={handleChange}
				size="small"
			/>
			<Link
				href={routes.join}
				style={{ textDecoration: "none" }}
				passHref
			>
				<Button variant="outlined" size="large" sx={{ width: "200px" }}>
					<Typography>Join</Typography>
				</Button>
			</Link>
		</Box>
	);
};

export default JoinLink;
