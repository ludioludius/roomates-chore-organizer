import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signin = async (name, username, password) => {
    setIsLoading(true)
    setError(null)

    axios.post('http://localhost:3001/api/users/signin', {
      name: name,
      username: username,      
      password: password,
    })
    .then((response) => {
      const json = JSON.stringify(response.data)
      console.log('response from hoook')
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

  return { signin, isLoading, error}
}
