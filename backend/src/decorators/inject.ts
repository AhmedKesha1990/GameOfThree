import { Store } from '../lib'


const inject: (name: string) => PropertyDecorator = (name: string): PropertyDecorator => {
  return (target: any, propertyKey: string | symbol): any => {
    const resource: any = Store.fetch(name)

    if (!resource) {
      Store.reserve(target, propertyKey, name)
    } else {
      target[propertyKey as string] = resource
    }

    return target[propertyKey as string]
  }
}

export { inject as Inject }
