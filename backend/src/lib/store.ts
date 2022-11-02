const container: Map<string, any> = new Map()
const requested: Map<string, { target: any; propertyKey: string | symbol; request: string }> = new Map()

const reserve: (target: any, propertyKey: string | symbol, request: string) => void = (
  target: any,
  propertyKey: string | symbol,
  request: string
): void => {
  requested.set(request.toUpperCase(), { propertyKey, request, target })
}

const register: (key: string, item: any) => void = (key: string, item: any): void => {
  if (requested.has(key.toUpperCase())) {
    requested.get(key.toUpperCase()).target[requested.get(key.toUpperCase()).propertyKey] = item
  }

  if (container.has(key.toUpperCase())) {
    throw new Error(`${key.toUpperCase()} already registered`)
  }

  container.set(key.toUpperCase(), item)
}

const fetch: (key: string) => any = (key: string): any => {
  return container.get(key.toUpperCase())
}

export interface Storage {
  register(key: string, item: any): void
  fetch(key: string): any
  reserve(target: any, propertyKey: string | symbol, request: string): void
}

const store: Storage = { fetch, register, reserve }

export { store as Store }
