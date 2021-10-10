import React, { useEffect } from 'react'
import { Layout } from 'components/Layout'
import { useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import { ROUTES } from 'constants/routes'
import { Heading } from 'components/Heading'

const App = () => {
  const { isLogin } = useAuthContext()
  const { push } = useRouter()
  useEffect(() => {
    if (!isLogin) {
      push(ROUTES.LOGIN)
    }
  }, [isLogin, push])

  if (!isLogin) {
    return null
  }

  return (
    <Layout>
      <Heading as="h3">Dashboard</Heading>
    </Layout>
  )
}

export default App
