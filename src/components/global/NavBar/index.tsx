import { Box } from "@mui/material";
import { Link } from "../../common";
import PrivateLinks from "./PrivateLinks";
import PublicLinks from "./PublicLinks";
import React from "react";
import { isPrerelease } from "../../../config";
import { paddingX } from "../../../style";
import { routes } from "../../../utils/routes";
import { useUser } from "../../../hooks/use-user";

export const NavBar: React.FC = () => {
	const { data, isLoading } = useUser();

	const user = data ? data.user : null;

	const renderPublicLinks = () => {
		return !isLoading && !user && !isPrerelease ? <PublicLinks /> : null;
	};

	const renderPrivateLinks = () => {
		return !isLoading && user ? <PrivateLinks /> : null;
	};

	return (
		<Box
			width="100%"
			display="flex"
			justifyContent="space-between"
			position="sticky"
			top="0px"
			zIndex={1}
			paddingX={paddingX.global}
			sx={{
				outline: "1px solid #ccc",
				backgroundColor: "white",
			}}
		>
			<Box display="flex" flexDirection="row">
				<Link
					text="Common Collections"
					href={user ? routes.home : routes.index}
				/>
			</Box>
			<Box display="flex" gap={[1, 2]}>
				{renderPublicLinks()}
				{renderPrivateLinks()}
			</Box>
		</Box>
	);
};
