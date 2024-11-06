import { Suspense, lazy } from 'react'
import { Button } from "lib"
import './App.css'

// @ts-expect-error
const ViteRemote = lazy(() => import('vite/App'))

// @ts-expect-error
const RsbuildRemote = lazy(() => import('rsbuild/App'))

function App() {
  return (
    <>
      <h1>Host</h1>
      <span>This is text from shell!</span>
      <Suspense>
        <h1>Remote UI Library</h1>
        <Button size='large' primary backgroundColor="darkblue" onClick={() => console.log("Bafiky!")}>
          My button
        </Button>
      </Suspense>
      <Suspense>
        <RsbuildRemote />
      </Suspense>
      <Suspense>
        <ViteRemote />
      </Suspense>
    </>
  )
}

export default App
