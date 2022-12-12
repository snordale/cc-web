import { Box, Button, Fade, Stack, TextField, Typography } from "@mui/material";

import { fontSizes } from "../../../style";
import { useState } from "react";

const JoinLink = () => {
	const [value, setValue] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<Stack width="100%" spacing={[1.5, 2]} pt={2}>
			<Typography fontSize={fontSizes.formHeader} fontWeight={500}>
				Join Waitlist
			</Typography>
			<Box
				width={["100%", "350px"]}
				display="flex"
				flexDirection={["column", "row"]}
				gap={1}
			>
				<TextField
					sx={{ flex: 1 }}
					type="email"
					placeholder="Email"
					label="Email"
					value={value}
					onChange={handleChange}
					size="small"
					fullWidth
				/>
				<Fade
					in={Boolean(value.length)}
					timeout={300}
					easing={{ enter: "ease-in-out", exit: "ease-in-out" }}
				>
					<Button variant="contained" size="large">
						<Typography>Join</Typography>
					</Button>
				</Fade>
			</Box>
		</Stack>
	);
};

export default JoinLink;
