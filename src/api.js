import { BASE_URL } from "./constants"

export const filterCharacter = (name, page) => new Promise((resolve, reject) => {
  fetch(`${BASE_URL}/character/?${!!page ? 'page='+page : ''}&name=${name}`)
  .then(res => res.json())
  .then(response => {
    if(!response.error){
      resolve(response)
    }else{
      reject(response.error)
    }
  })
  .catch(() => reject('Error efectuando búsqueda, intenta de nuevo más tarde.'))
})