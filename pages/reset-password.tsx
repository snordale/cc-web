import { NextPage } from 'next'
import { SendResetForm } from '../src/components/pages/reset-password/SendResetForm'
import { SetPasswordForm } from '../src/components/pages/reset-password/SetPasswordForm'
import { createUrqlClient } from '../src/utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

const ResetPassword: NextPage<{ token: string | undefined }> = ({ token }) => {
	return (
		<>
			{!token ? (
				<SendResetForm />
			): (
				<SetPasswordForm token={token} />
			)}
		</>
	)
}

ResetPassword.getInitialProps = ({ query }) => {
	return { token: query.token as string }
}

export default withUrqlClient(createUrqlClient)(ResetPassword)