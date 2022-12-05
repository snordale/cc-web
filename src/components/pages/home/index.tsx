import { NormalPage } from "../../common/NormalPage";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const Home: React.FC = () => {
	const router = useRouter();

	const { data, isUserLoaded, isLoggedIn } = useUser();

	if (!isLoggedIn) router.push("/");

	if (!isUserLoaded) return null;

	return (
		<NormalPage>
			<Typography>Welcome {data?.user.username}.</Typography>
		</NormalPage>
	);
};
