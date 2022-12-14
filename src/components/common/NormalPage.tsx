import { Box, Fade, useMediaQuery } from "@mui/material";
import { Footer, NavBar } from "../global";

import React from "react";
import { Toaster } from "react-hot-toast";
import { navHeight } from "../../style";

interface NormalPageProps {
	children: React.ReactNode;
}

export const NormalPage: React.FC<NormalPageProps> = ({ children }) => {
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
					paddingX={isMobile ? "18px" : "40px"}
					paddingY={isMobile ? "24px" : "40px"}
				>
					{children}
				</Box>
			</Fade>
			<Footer />
			<Toaster position="bottom-center" />
		</Box>
	);
};
