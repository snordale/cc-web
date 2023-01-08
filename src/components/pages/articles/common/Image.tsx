import Image, { StaticImageData } from "next/image";

import { Box } from "@mui/material";

const ArticleImage = ({ image }: { image: StaticImageData }) => (
	<Box position="relative" width="60px">
		<Box>
			<Image
				src={image}
				alt="Musical note."
				style={{
					width: "100%",
					height: "auto",
				}}
			/>
		</Box>
	</Box>
);

export default ArticleImage;
