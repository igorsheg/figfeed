import React, { FC, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useFigFeedStore from './stores'
import Login from './views/Login'

const App: FC = () => {
  const { figma_access_token, set } = useFigFeedStore()
  const navigate = useNavigate()
  useEffect(() => {
    set((d) => {
      d.figma_access_token = document.cookie
        .split('; ')
        .find((r) => r.startsWith('figma_access_token='))
        ?.split('=')[1]
    })
  }, [document.cookie])

  useEffect(() => {
    if (figma_access_token && figma_access_token.length) {
      navigate('/feed')
    } else {
      navigate('/login')
    }
  }, [figma_access_token])

  return (
    <Wrap>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<div>wow!</div>} />
      </Routes>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`
export default App
