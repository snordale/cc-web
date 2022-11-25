import { Header } from "./Header";
import { JoinForm } from "./JoinForm";
import { NormalPage } from "../../common/NormalPage";
import { useRouter } from "next/router";

export * from "./Header";
export * from "./JoinForm";

export const Join = () => {
	const router = useRouter();

	const curatorToken = router.query.token
		? (router.query.token as string)
		: "";

	return (
		<NormalPage>
			<Header curatorToken={curatorToken} />
			<JoinForm curatorToken={curatorToken} />
		</NormalPage>
	);
};
