import { cet4JSON } from './cet4.js'

export const CET4 = "CET4"

export const getDicts = () => {
  return [{"name": CET4, "data":cet4JSON}]
}

export const getDict = (name) => {
  if (name === CET4) {
    return cet4JSON
  }
  return cet4JSON
}