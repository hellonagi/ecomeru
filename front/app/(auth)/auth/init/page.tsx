import InitForm from '@/features/auth/InitForm'
import { initUsername } from '@/features/auth/actions/init-username'

export default async function Page() {
  return (
    <>
      <h1>Welcome</h1>
      <InitForm onFormAction={initUsername} />
    </>
  )
}
