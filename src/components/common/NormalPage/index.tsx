import { Box, Fade, useMediaQuery } from "@mui/material";
import { navHeight, paddingX } from "../../../style";

import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import React from "react";
import { Toaster } from "react-hot-toast";

interface Props {
	children: React.ReactNode;
	[x: string]: any;
}

export const NormalPage: React.FC<Props> = ({ children, ...rest }) => {
	const isMobile = useMediaQuery("(max-width:600px)");

	return (
		<Box width="100%" minHeight="100vh">
			<NavBar />
			<Fade in={true} timeout={400}>
				<Box
					minHeight={`calc(100vh - ${navHeight}px)`}
					width="100%"
					display="flex"
					flexDirection="column"
					alignItems="center"
					paddingX={paddingX.global}
					paddingY={isMobile ? "24px" : "40px"}
					{...rest}
				>
					{children}
				</Box>
			</Fade>
			<Footer />
			<Toaster position="bottom-center" />
		</Box>
	);
};
