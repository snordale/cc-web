import { Box, Button, Stack, Typography } from "@mui/material";

import { CommonButton } from "../../common";
import Image from "next/image";
import LinearProgress from "../../common/LinearProgress";
import Link from "next/link";
import { NormalPage } from "../../common/NormalPage";
import { fontSizes } from "../../../style";
import shadow from "../../../../public/shadow.avif";
import { useCurrentUser } from "../../../services/query";
import { useRouter } from "next/router";

export const Index = () => {
	const router = useRouter();

	const { data, isLoading } = useCurrentUser();

	if (isLoading) return <LinearProgress />;

	if (data?.user) router.push("/home");

	return (
		<NormalPage>
			<Box
				width="100%"
				display="flex"
				flexDirection={["column", "column", "row"]}
			>
				<Stack flex={1} p={1} spacing={2}>
					<Typography fontSize={fontSizes.indexHeader}>
						Weekly playlist for people who know what's worth
						listening to.
					</Typography>
					<Box>
						<Link
							href="/join"
							style={{ textDecoration: "none" }}
							passHref
						>
							<Button variant="outlined" size="large">
								<Typography>Join</Typography>
							</Button>
						</Link>
					</Box>
				</Stack>
				<Box
					flex={1}
					p={1}
					maxHeight={["200px", "200px", "400px"]}
					overflow="hidden"
				>
					<Image src={shadow} alt="Palm tree silhouette." />
				</Box>
			</Box>
		</NormalPage>
	);
};
