import React, { useEffect } from 'react'

function App() {
  useEffect(()=>{
    console.log(import.meta.env.VITE_APPWRITE_URL)
  },[])
  return (
    <div>App</div>
  )
}

export default App