import { Stack } from "@mui/material";

const CenteredForm: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Stack
			flex={1}
			width="100%"
			spacing={3}
			alignItems="center"
			justifyContent="center"
			paddingBottom={8}
		>
			{children}
		</Stack>
	);
};

export default CenteredForm;
