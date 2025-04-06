import { ModulePathRoutes } from '@/domain'

export enum ExampleRoutes {
  Home = '/home'
}

export enum ExamplePages {
  Home = ModulePathRoutes.Example + ExampleRoutes.Home // /example/home
}

//${ModulePathRoutes.Example}/${ExampleRoutes.Home}
