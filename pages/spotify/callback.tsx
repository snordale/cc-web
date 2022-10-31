import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { createUrqlClient } from "../../src/utils/createUrqlClient";
import toast from "react-hot-toast";
import { useExchangeAuthCodeMutation } from "../../src/generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

const SpotifyCallback: React.FC = () => {
	const router = useRouter();
	const { query } = router;

	const [, exchangeAuthCode] = useExchangeAuthCodeMutation();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!query.code || !query.state) return;

		async function doExchange() {
			const res = await exchangeAuthCode({
				code: query.code as string,
				state: query.state as string,
			});

			if (res.data?.exchangeAuthCode.user) {
				toast.success("Spotify linked");
				router.replace("/account");
			} else {
				if (
					res.data?.exchangeAuthCode.error ===
					"Spotify account connected to another account."
				) {
					toast.error("Spotify account in use.");
				}
				router.replace("/account");
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

export default withUrqlClient(createUrqlClient)(SpotifyCallback);
