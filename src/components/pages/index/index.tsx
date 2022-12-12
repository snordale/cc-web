import { Box, Stack, Typography } from "@mui/material";
import { fontSizes, paddingX } from "../../../style";

import Image from "next/image";
import JoinLink from "./JoinLink";
import { NormalPage } from "../../common/NormalPage";
import WaitlistForm from "./WaitlistForm";
import graphic from "../../../../public/graphic.png";
import { isPrerelease } from "../../../config";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

const photoSize = ["200px", "300px", "450px"];

export const Index = () => {
	const router = useRouter();

	const { isLoggedIn } = useUser();

	if (isLoggedIn) router.push("/home");

	return (
		<NormalPage>
			<Box
				width="100%"
				display="flex"
				paddingX={paddingX.global}
				gap={2}
				flexDirection={["column", "row"]}
				alignItems={["center", "center"]}
			>
				<Stack flex={1} spacing={1} alignItems="center">
					<Typography fontSize={fontSizes.indexHeader}>
						Weekly playlist for people who know what's worth
						listening to.
					</Typography>
					<Typography
						fontSize={fontSizes.indexSubheader}
						color="grey.700"
					>
						Discover new music selected from the listening data of
						the top culture-makers.
					</Typography>
					{isPrerelease ? <WaitlistForm /> : <JoinLink />}
				</Stack>
				<Box
					flex={1}
					position="relative"
					minWidth={photoSize}
					minHeight={photoSize}
				>
					<Image
						src={graphic}
						alt="Palm tree silhouette."
						fill
						objectFit="cover"
					/>
				</Box>
			</Box>
		</NormalPage>
	);
};
