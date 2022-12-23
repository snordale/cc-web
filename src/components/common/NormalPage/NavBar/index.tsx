import { Box } from "@mui/material";
import { Link } from "../../Link";
import PrivateLinks from "./PrivateLinks";
import PublicLinks from "./PublicLinks";
import { isPrerelease } from "../../../../config";
import { paddingX } from "../../../../style";
import { routes } from "../../../../utils/routes";
import { useUser } from "../../../../hooks/use-user";

export const NavBar = () => {
  const { user, isLoading, isAuthenticated } = useUser();

  const renderPublicLinks = () => {
    return !isLoading && !user && !isPrerelease ? <PublicLinks /> : null;
  };

  const renderPrivateLinks = () => {
    return isAuthenticated ? <PrivateLinks /> : null;
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      position="sticky"
      top="0px"
      zIndex={1}
      paddingX={paddingX.global}
      paddingY={1}
      sx={{
        outline: "1px solid black",
        backgroundColor: "white",
      }}
    >
      <Box display="flex" flexDirection="row">
        <Link
          text="Common Collections"
          href={user ? routes.home : routes.index}
        />
      </Box>
      <Box display="flex" gap={[1, 2]}>
        {renderPublicLinks()}
        {renderPrivateLinks()}
      </Box>
    </Box>
  );
};
