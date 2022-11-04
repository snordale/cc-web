import { Home, Landing } from "../src/components/pages/index";
import { useMeQuery } from "../src/generated/graphql";

import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Spinner } from "../src/components/global";
import { NormalPage } from "../src/components/common/NormalPage";
import { createUrqlClient } from "../src/utils/createUrqlClient";

const Index: NextPage = () => {
	const [{ data, fetching }] = useMeQuery();

	if (fetching) return <Spinner />;

	return <NormalPage>{data?.me ? <Home /> : <Landing />}</NormalPage>;
};

export default withUrqlClient(createUrqlClient)(Index);
