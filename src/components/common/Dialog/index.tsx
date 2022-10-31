import { Dialog as MuiDialog } from "@mui/material";
import React from "react";

interface DialogProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
	return (
		<MuiDialog open={open} onClose={onClose}>
			{children}
		</MuiDialog>
	);
};
