import { Box, Stack, Typography } from "@mui/material";

import { Link } from "../../Link";
import { articlesData } from "../../../pages/articles/data";
import { paddingX } from "../../../../style";

export const Footer = () => {
  const renderArticleLinks = () => {
    return Object.keys(articlesData).map((key) => {
      const { title, href } = articlesData[key as never];
      return <Link key={title} text={title} href={href} fontSize={14} />;
    });
  };

  return (
    <Box
      paddingX={paddingX.global}
      paddingY={["32px", "50px"]}
      borderTop="1px solid #c4c4c4"
      width="100%"
      display="flex"
      flexDirection={["column", "row"]}
      justifyContent="space-between"
    >
      <Link
        text="Common Collections"
        href="/"
        fontSize={18}
        marginRight="auto"
        marginBottom={2}
      />
      <Stack spacing={1}>
        <Typography fontWeight={600}>Articles</Typography>
        {renderArticleLinks()}
      </Stack>
    </Box>
  );
};
