import { Box } from "@mui/material";
import { Link } from "../../Link";
import { paddingX } from "../../../../style";

export const Footer = () => {
	return (
		<Box
			paddingX={paddingX.global}
			paddingY={["32px", "50px"]}
			borderTop="1px solid #c4c4c4"
			width="100%"
			display="flex"
			justifyContent="space-between"
		>
			<Link text="Common Collections" href="/" fontSize={16} />
		</Box>
	);
};
