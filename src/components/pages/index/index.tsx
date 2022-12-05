import { Box, Button, Stack, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import { NormalPage } from "../../common/NormalPage";
import { fontSizes } from "../../../style";
import { routes } from "../../../utils/routes";
import shadow from "../../../../public/shadow.avif";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const Index = () => {
	const router = useRouter();

	const { isLoggedIn } = useUser();

	if (isLoggedIn) router.push("/home");

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
							href={routes.join}
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
