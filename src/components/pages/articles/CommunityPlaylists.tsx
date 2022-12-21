import { Stack, Typography } from "@mui/material";

import { NormalPage } from "../../common";
import { Paragraph } from "./common/Paragraph";
import { paddingX } from "../../../style";

export const CommunityPlaylists = () => {
	return (
		<NormalPage paddingX={paddingX.global}>
			<Stack paddingX={[0, 4, 8, 18]} paddingY={2} spacing={2}>
				<Typography fontSize={[20, 32]}>
					The Value of Community Playlists
				</Typography>
				<Paragraph>
					Discovering new music can be a daunting task. With the vast
					amount of music available at our fingertips, it can be
					overwhelming to try and sift through it all to find
					something that truly speaks to us. That's where a community
					oriented weekly playlist comes in.
				</Paragraph>
				<Paragraph>
					One of the biggest benefits of a community oriented playlist
					is the diversity of musical tastes it represents. By drawing
					from the listening data of people with the best music taste,
					you're tapping into a diverse range of genres and styles,
					rather than relying on algorithms or industry hype to
					dictate what you should be listening to. This not only helps
					you discover new music that you may not have come across
					otherwise, but also exposes you to a wider range of musical
					styles and cultural influences.
				</Paragraph>
				<Paragraph>
					In addition to diversity, a community oriented playlist also
					offers a sense of community and connection. By sharing your
					musical discoveries with others and seeing what they're
					listening to, you can engage in meaningful conversations and
					discussions about music. This can be especially valuable in
					a time where we're all feeling more isolated than ever. A
					community oriented playlist also has the added benefit of
					being constantly updated. With new songs and artists being
					added on a weekly basis, you'll always have a fresh supply
					of music to discover. This keeps things exciting and ensures
					that you're never stuck listening to the same old tunes.
				</Paragraph>
				<Paragraph>
					Overall, a community oriented weekly playlist is the best
					way to discover new music because it offers a diverse range
					of musical tastes, a sense of community and connection, and
					constantly updated content. So next time you're looking for
					something new to listen to, consider joining a community
					oriented playlist and see what musical treasures you can
					uncover.
				</Paragraph>
			</Stack>
		</NormalPage>
	);
};
