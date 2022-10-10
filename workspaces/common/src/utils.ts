import { Data } from "./types"

export const validateData = (data: Data) => {
  if(data.label.trim() === "" || data.value.trim() === "") {
    return "not empty"
  }
  return null
}
