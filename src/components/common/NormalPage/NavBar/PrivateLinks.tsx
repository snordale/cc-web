import { Link } from "../../Link";
import { routes } from "../../../../utils/routes";
import { useUser } from "../../../../hooks/use-user";

const PrivateLinks = () => {
  const { isAdmin } = useUser();

  return (
    <>
      {isAdmin && <Link text="Admin" href="/admin" />}
      <Link text="Account" href={routes.account} />
      <Link text="Logout" href={routes.logout} />
    </>
  );
};

export default PrivateLinks;
