import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signin = async (idToken, isSuccessful, errorMessage) => {

    if (!isSuccessful) {
      setIsLoading(false)
      setError(errorMessage);
    } else {
      axios.post('http://localhost:3001/api/users/signin', {
        idToken: idToken
      })
          .then((response) => {
            const json = JSON.stringify(response.data)
            console.log('response from hook')
            // store response data in the browser (includes token)
            localStorage.setItem('user', json)

            //update AuthContext
            dispatch( {type: 'LOGIN', payload: json })
            setIsLoading(false)
          })
          .catch((e) => {
            console.log(e)
            setIsLoading(false)
            setError(e.response.data.error)
          })
    }
  }

  return { signin, isLoading, error}
}
