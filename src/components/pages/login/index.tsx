import { Box } from "@mui/material";
import CenteredForm from "../../common/CenteredForm";
import { Header } from "./Header";
import Image from "next/image";
import LinearProgress from "../../common/LinearProgress";
import { Link } from "../../common/Link";
import { LoginForm } from "./LoginForm";
import { NormalPage } from "../../common/NormalPage";
import { fontSizes } from "../../../style";
import roseVinyl from "../../../../public/rose-vinyl.png";
import { routes } from "../../../utils/routes";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export * from "./Header";
export * from "./LoginForm";

export const Login = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();

  // Don't need to redirect. If initial page, will fetch user. If not
  if (router.isReady && user)
    router.push(
      router.query.next ? (router.query.next as string) : routes.home
    );
  if (isLoading || user) return <LinearProgress />;

  return (
    <NormalPage>
      <CenteredForm>
        <Box position="relative" width="74px" height="50px">
          <Image
            src={roseVinyl}
            alt="Drawing of music sharing website."
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
        <Header />
        <LoginForm />
        <Box display="flex">
          <Link
            text="Forgot Password?"
            href="/reset-password"
            fontSize={fontSizes.small}
          />
        </Box>
      </CenteredForm>
    </NormalPage>
  );
};
