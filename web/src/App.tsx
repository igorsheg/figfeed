import React, { FC } from 'react'
import styled from 'styled-components'
import Login from './views/Login'

const App: FC = () => {
  return (
    <Wrap>
      <Login />
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`
export default App
