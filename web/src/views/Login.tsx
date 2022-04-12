import { Button } from '@mantine/core'
import React from 'react'
import styled from 'styled-components'
import Flex from '../components/Flex'
import Padder from '../components/Padder'

const Login = () => {
  const BASE_URL = window.location.origin

  const URL_PARAMS = [
    { key: 'client_id', value: 'LCDcM4bXviwDgoLJVJUE3H' },
    { key: 'redirect_uri', value: `${BASE_URL}/oauth/callback` },
    { key: 'scope', value: 'file_read' },
    { key: 'response_type', value: 'code' },
    { key: 'state', value: '' },
  ]

  const loginHandler = () => {
    window.open(
      'https://www.figma.com/oauth?' +
        URL_PARAMS.map((p) => p.key + '=' + p.value).join('&'),
      '_self'
    )
  }

  return (
    <>
      <Wrap justify="center" align="center">
        <Content column justify="center" align="center">
          <h1>FigFeed</h1>
          <p>Display a running feed of latest Figma projects.</p>
          <Padder y={36} />
          <Button size="md" onClick={loginHandler}>
            Sign in with Figma
          </Button>
        </Content>
      </Wrap>
    </>
  )
}

const Content = styled(Flex)`
  max-width: 600px;
  h1 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 1.618rem;
  }
`

const Wrap = styled(Flex)`
  width: 100vw;
  height: 100vh;
`
export default Login
