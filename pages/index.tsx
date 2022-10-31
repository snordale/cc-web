import { Home, Landing } from "../src/components/pages/index";
import { useMeQuery } from "../src/generated/graphql";

import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { NormalPage } from "../src/components/global/NormalPage";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { isLocal } from "../src/config";

const Index: NextPage = () => {
	const [{ data, error }] = useMeQuery();

	console.log("env");
	console.log(isLocal);

	if (!data) return null;

	return <NormalPage>{data?.me ? <Home /> : <Landing />}</NormalPage>;
};

export default withUrqlClient(createUrqlClient)(Index);
