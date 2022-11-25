import { NormalPage } from "../../common/NormalPage";
import { Typography } from "@mui/material";
import { useCurrentUser } from "../../../services/query";
import { useRouter } from "next/router";

export const Home: React.FC = () => {
	const router = useRouter();

	const { data, isLoading } = useCurrentUser();

	console.log("data");
	console.log(data);

	if (!data || isLoading) return null;

	if (!data.user) {
		router.push("/");
		return null;
	}

	return (
		<NormalPage>
			<Typography>Welcome {data.user.username}.</Typography>
		</NormalPage>
	);
};
