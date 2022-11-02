import 'reflect-metadata'
import { Store } from '../lib'

const injectable: (name: string) => ClassDecorator = (name: string): ClassDecorator => {
  return (target: any): void => {
    Store.register(name, new target())
  }
}

export { injectable as Injectable }
