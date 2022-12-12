import { Header } from "./Header";
import { JoinForm } from "./JoinForm";
import { NormalPage } from "../../common/NormalPage";
import { routes } from "../../../utils/routes";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export * from "./Header";
export * from "./JoinForm";

export const Join = () => {
	const router = useRouter();

	const { isLoggedIn } = useUser();

	const curatorToken = router.query.token
		? (router.query.token as string)
		: "";

	if (isLoggedIn) router.replace(routes.home);

	return (
		<NormalPage>
			<Header curatorToken={curatorToken} />
			<JoinForm curatorToken={curatorToken} />
		</NormalPage>
	);
};
