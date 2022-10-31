import { Home, Landing } from "../src/components/pages/index";
import { useMeQuery } from "../src/generated/graphql";

import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { NormalPage } from "../src/components/global/NormalPage";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { isLocal } from "../src/config";
import { Spinner } from "../src/components/global";

const Index: NextPage = () => {
	const [{ data, fetching }] = useMeQuery();

	console.log("env");
	console.log(process.env.IS_LOCAL);
	console.log(isLocal);

	if (fetching) return <Spinner />;

	return <NormalPage>{data?.me ? <Home /> : <Landing />}</NormalPage>;
};

export default withUrqlClient(createUrqlClient)(Index);
