import { Form, Header } from '../src/components/pages/join'

import { NormalPage } from '../src/components/global/NormalPage'
import { createUrqlClient } from '../src/utils/createUrqlClient'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'

const Join = ({ }) => {
	const router = useRouter()

	const curatorToken = router.query.token ? router.query.token as string : ""

	return (
		<NormalPage>
			<Header curatorToken={curatorToken} />
			<Form curatorToken={curatorToken} />
		</NormalPage>
	)
}

export default withUrqlClient(createUrqlClient)(Join)