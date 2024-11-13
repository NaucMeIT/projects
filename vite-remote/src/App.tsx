import { useState } from 'react'
import './App.css'
import { Button } from 'vite-rslib-ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Remote Vite</h1>
      <Button primary onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
