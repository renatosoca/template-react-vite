import { IErrorPageInterface } from '.'

export interface IAppState {
  isFetching: boolean
  error: IErrorPageInterface | undefined
}

export const INITIAL_STATE_APP: IAppState = {
  isFetching: false,
  error: undefined
}
