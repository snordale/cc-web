import { Box, Stack, Typography } from "@mui/material";

import { NormalPage } from "../../common";
import { paddingX } from "../../../style";

export const MusicXTechnology = () => {
	return (
		<NormalPage>
			<Stack paddingX={[0, 9]} paddingY={[2, 4]} spacing={2}>
				<Typography width="100%" fontSize={[24, 36]}>
					The Future of Music and Technology
				</Typography>
				<Typography fontSize={14}>
					The role of technology in music production and consumption
					is constantly evolving, and it's difficult to predict
					exactly how it will change over the next 100 years. However,
					it's safe to say that technology will continue to play a
					significant role in shaping the way we create and consume
					music.
				</Typography>
				<Typography fontSize={14}>
					One potential area of change is the way music is produced.
					With the increasing prevalence of virtual instruments and
					software-based production tools, it's becoming easier for
					musicians to create and record music from the comfort of
					their own homes. This has already had a profound impact on
					the music industry, with many artists opting to self-produce
					and release their music independently. It's likely that
					these trends will continue to develop in the coming years,
					with technology enabling even more musicians to bypass
					traditional industry gatekeepers and get their music out
					into the world.
				</Typography>
				<Typography fontSize={14}>
					Another area where technology could have a significant
					impact is in the distribution and consumption of music.
					Streaming services have already revolutionized the way we
					access and listen to music, and it's likely that we'll see
					the continued growth of these platforms in the coming years.
					In addition, the use of virtual and augmented reality in
					music consumption could become more widespread, allowing
					listeners to experience music in new and immersive ways.
					Imagine attending a virtual concert where you can feel like
					you're right there in the front row, or exploring a virtual
					world while listening to a playlist tailored specifically to
					your tastes.
				</Typography>
				<Typography fontSize={14}>
					One thing that is certain is that technology will continue
					to play a major role in the way we create and consume music.
					Whether it's through new production tools, distribution
					platforms, or immersive listening experiences, technology
					will continue to shape the music industry in ways we can't
					yet fully imagine. The next 100 years of music are sure to
					be exciting and unpredictable, and it will be fascinating to
					see how technology continues to influence the way we create
					and consume music.
				</Typography>
			</Stack>
		</NormalPage>
	);
};
