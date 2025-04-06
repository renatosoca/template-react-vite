import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAppStateContext } from './store'
import { ModulePathRoutes } from './domain'

const ErrorBoundary = lazy(() => import('@/shared/components/error-boundary/ErrorBoundary'))
const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const ExampleModuleRoutes = lazy(() => import('@/app/exampleModule/ExampleModuleRoutes'))

function App() {
  const { error } = useAppStateContext()

  return (
    <ErrorBoundary pathname={window.location.pathname} error={error}>
      <RouteWithNotFound>
        <Route path="/" element={<Navigate to={ModulePathRoutes.Example} />} />

        <Route path={`${ModulePathRoutes.Example}/*`} element={<ExampleModuleRoutes />} />
      </RouteWithNotFound>
    </ErrorBoundary>
  )
}

export default App
