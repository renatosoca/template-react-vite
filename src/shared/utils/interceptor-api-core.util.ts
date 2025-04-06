import { apiInstanceCore } from '.'

export const interceptorApiCore = () => {
  apiInstanceCore().interceptors.request.use(
    (config) => {
      // Do something before request is sent
      return config
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  apiInstanceCore().interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )
}
