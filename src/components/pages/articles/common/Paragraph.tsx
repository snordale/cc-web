import React from "react";
import { Typography } from "@mui/material";

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
	return <Typography fontSize={16}>{children}</Typography>;
};
