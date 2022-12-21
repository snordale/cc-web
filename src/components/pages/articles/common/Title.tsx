import { Typography } from "@mui/material";

export const Title = ({ text }: { text: string }) => {
	return (
		<Typography width="100%" fontSize={[24, 36]}>
			{text}
		</Typography>
	);
};
