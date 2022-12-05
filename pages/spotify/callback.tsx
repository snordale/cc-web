import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { cc } from "../../src/services/cc";
import { routes } from "../../src/utils/routes";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const SpotifyCallback: React.FC = () => {
	const router = useRouter();
	const { query } = router;

	const { mutateAsync: exchangeAuthCode } = useMutation(cc.exchangeAuthCode);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!query.code || !query.state) return;

		async function doExchange() {
			const data = await exchangeAuthCode({
				code: query.code as string,
				stateToken: query.state as string,
			});

			if (data.success) {
				toast.success("Spotify linked.", { id: "spotify linked" });
				router.replace(routes.account);
			} else {
				if (
					data.error ===
					"Spotify account connected to another account."
				) {
					toast.error("Spotify account in use.");
				}
				router.replace(routes.account);
			}
		}

		doExchange();
	}, [query]);

	return (
		<Box>
			<div>spotify callback</div>
			<Typography>{loading ? "loading..." : "complete"}</Typography>
		</Box>
	);
};

export default SpotifyCallback;
