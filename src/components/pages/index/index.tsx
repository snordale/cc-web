import { Box, Button, Stack, Typography } from "@mui/material";
import { fontSizes, paddingX } from "../../../style";

import AspectRatio from "@mui/joy/AspectRatio";
import Image from "next/image";
import JoinLink from "./JoinLink";
import Link from "next/link";
import { NormalPage } from "../../common/NormalPage";
import WaitlistForm from "./WaitlistForm";
import blades from "../../../../public/blades.jpg";
import { isPrerelease } from "../../../config";
import palms from "../../../../public/palms.jpg";
import { routes } from "../../../utils/routes";
import shadow from "../../../../public/shadow.avif";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

const photoHeight = "150px";

export const Index = () => {
	const router = useRouter();

	const { isLoggedIn } = useUser();

	if (isLoggedIn) router.push("/home");

	return (
		<NormalPage>
			<Stack
				width="100%"
				display="flex"
				paddingX={paddingX.global}
				spacing={4}
			>
				<Typography fontSize={fontSizes.indexHeader}>
					Weekly playlist for people who know what's worth listening
					to.
				</Typography>
				{isPrerelease ? <WaitlistForm /> : <JoinLink />}
				<Box position="relative" height={photoHeight}>
					<Image
						src={shadow}
						alt="Palm tree silhouette."
						fill
						objectFit="cover"
					/>
				</Box>
			</Stack>
		</NormalPage>
	);
};
