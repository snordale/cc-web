import { Box, Typography } from "@mui/material";
import { CommonButton, NormalPage, PageHeader } from "../../common";

import { UserTable } from "./UserTable";
import { cc } from "../../../services/cc";
import { paddingX } from "../../../style";
import { root } from "../../../config";
import { routes } from "../../../utils/routes";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

const Admin: React.FC = () => {
	const router = useRouter();
	const { data, isLoading, isAdmin } = useUser();
	const { mutateAsync: createCuratorToken } = useMutation(
		cc.createCuratorToken
	);
	//const [, getNewCuratorToken] = useGetNewCuratorTokenMutation();
	//const [, createPlaylist] = useCreatePlaylist()
	//console.log("cookie: ", getCookie("token"));
	//if (isLoading) return <Spinner />;

	//if (!isLoggedIn) router.push("/");

	//if (!isAdmin) {
	//	router.replace("/").then(() => {
	//		toast.error("Admins only.", { id: "admins only" });
	//	});
	//	return null;
	//}

	return (
		<NormalPage>
			<Box width="100%" paddingX={paddingX.global}>
				<PageHeader text="Admin" />
				<Typography>The world is yours.</Typography>
				<CommonButton
					text="Create Curator Link"
					sx={{ marginTop: "12px" }}
					onClick={async () => {
						const data = await createCuratorToken();
						console.log("data");
						console.log(data);
						if (data.token) {
							await navigator.clipboard.writeText(
								`${root}${routes.join}?token=${data.token}`
							);
							toast.success("Copied to clipboard.");
						} else {
							toast.error("Unsuccessful.");
						}
					}}
				/>
				<CommonButton
					text="Create Playlist"
					sx={{ marginTop: "12px" }}
					//onClick={async () => createPlaylist())}
				/>
				<Box width="100%" marginTop="30px">
					<UserTable />
				</Box>
			</Box>
		</NormalPage>
	);
};

export default Admin;
