import { PersistedStateOptions, Serializer } from 'pinia-plugin-persistedstate'

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
interface persistOpts<T> {
  enable?: boolean
  data?: Array<T>
}
interface optsData {
  key: string
  paths: string[]
}

const piniaPersistConfig = (opts: persistOpts<optsData>) => {
  let persist: boolean | Array<PersistedStateOptions>

  if (opts.enable) {
    persist = true
    return
  }

  persist = []

  if (opts.data) {
    persist = opts.data.map(item => {
      return {
        key: item.key,
        storage: localStorage,
        paths: item.paths,
      }
    })
  }

  return persist
}

export default piniaPersistConfig
