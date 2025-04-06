import { PropsWithChildren } from 'react'
import { Route, Routes } from 'react-router-dom'

const RouteWithNotFound = ({ children }: PropsWithChildren) => {
  return (
    <Routes>
      {children}

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default RouteWithNotFound
