import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { NormalPage } from "../../src/components/global/NormalPage";
import { createUrqlClient } from "../../src/utils/createUrqlClient";

const Index: NextPage = () => {
	return <NormalPage>Spotify</NormalPage>;
};

export default withUrqlClient(createUrqlClient)(Index);
