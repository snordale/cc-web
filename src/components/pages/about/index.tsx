import { Box, Typography } from "@mui/material";

import { NormalPage } from "../../common/NormalPage";
import { paddingX } from "../../../style";

const About = () => {
	return (
		<NormalPage>
			<Box width="100%" display="flex" gap={2} flexDirection={"column"}>
				<Typography>
					Welcome to the About page of our music sharing platform! Our
					platform was founded with the goal of providing music lovers
					with personalized recommendations based on the listening
					data of expert curators. We believe that everyone has their
					own unique taste in music, and our platform is designed to
					help you discover new songs and artists that match your
					preferences. Our team is made up of music enthusiasts and
					technology experts who are passionate about using artificial
					intelligence to help people discover new music. We
					hand-select a group of curators who are well-versed in
					various genres and styles, and use their listening data to
					create personalized playlists for our users. In addition to
					personalized recommendations, our platform also allows you
					to connect with other music lovers and share your own
					playlists. We believe that music is meant to be shared, and
					we strive to create a community of like-minded individuals
					who can discover and enjoy new music together. Thank you for
					choosing our platform, and we hope that you find many new
					songs and artists to love!
				</Typography>
				<Typography>
					Welcome to our music sharing platform! We are excited to
					introduce you to a unique way of discovering new music. Our
					platform uses artificial intelligence to create weekly
					playlists based on the listening data of a group of
					hand-selected curators. This means that you get personalized
					recommendations based on the music tastes of experts in the
					field. Not only do our AI-powered playlists provide you with
					a diverse selection of songs, but they also help you stay
					up-to-date with the latest releases from your favorite
					artists. But that's not all – our platform also allows you
					to connect with other music lovers and share your own
					playlists. You can even follow your favorite curators and
					see what they're listening to. Sign up now and start
					exploring a world of new music!
				</Typography>
			</Box>
		</NormalPage>
	);
};

export default About;
