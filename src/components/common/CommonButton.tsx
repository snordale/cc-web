import { Box, SxProps, Theme } from "@mui/material";
import React, { useState } from "react";

import { LoadingButton as MuiButton } from "@mui/lab";
import { signatureGradientLight } from "../../constants";

interface ButtonProps {
	text?: string;
	size?: "small" | "medium" | "large";
	href?: string;
	disabled?: boolean;
	sx?: SxProps<Theme>;
	variant?: "outlined" | "contained" | "text";
	onClick?: () => void | Promise<void>;
	children?: React.ReactNode;
}

export const CommonButton: React.FC<ButtonProps> = ({
	text,
	size = "medium",
	href,
	disabled,
	sx,
	variant = "outlined",
	onClick,
	children,
	...rest
}) => {
	const [loading, setLoading] = useState(false);

	const handleOnClick = async () => {
		if (!loading && onClick) {
			setLoading(true);
			await onClick();
			setLoading(false);
		}
	};
	return (
		<Box>
			<MuiButton
				{...rest}
				variant={variant}
				size={size}
				href={href}
				onClick={handleOnClick}
				loading={loading}
				disabled={disabled}
				sx={[
					{
						borderColor: "primary.main",
						color: "primary.main",
						//":hover": {
						//	background: signatureGradientLight,
						//},
						"&.Mui-disabled": {
							borderColor: "#aaa",
							color: "#aaa",
						},
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
			>
				{text}
				{children}
			</MuiButton>
		</Box>
	);
};
