import { Link } from "../../common";
import { routes } from "../../../utils/routes";

const PublicLinks = () => {
	return (
		<>
			<Link text="Login" href={routes.login} />
			<Link text="Join" href={routes.join} />
		</>
	);
};

export default PublicLinks;
